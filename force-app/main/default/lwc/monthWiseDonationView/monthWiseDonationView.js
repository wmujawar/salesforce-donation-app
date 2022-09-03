import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDonationOfMonth from '@salesforce/apex/DonationController.getDonationOfMonth';

export default class MonthWiseDonationView extends LightningElement {
    columns = [
        {label: 'Donation #', fieldName: 'Name', type: 'text', cellAttributes: { alignment: 'right'}, editable: false},
        {label: 'Date', fieldName: 'Donation_Date__c', type: 'date', editable: false},
        {label: 'Amount', fieldName: 'Amount__c', type: 'currency', editable: false},
        {label: 'Individual Contributor', fieldName: 'Contributor', type: 'text', editable: false},
        {label: 'Event', fieldName: 'Event', type: 'text', editable: false},
    ];

    columnData = [];

    get isColumnDataPopulated() {
        return this.columnData.length > 0;
    }

    @api
    month = (new Date()).getMonth() + 1;

    @api
    year = (new Date()).getFullYear();

    @wire(getDonationOfMonth, { month: '$month', year: '$year' })
    donationRecords({data, error}) {
        if (data) {
            this.columnData = data.map(row => {
                return {...row, Contributor: row.Persona__r ? row.Persona__r.Name : '', Event: row.Event__r ? row.Event__r.Name : ''};
            });
        } else if (error) {
            const event = new ShowToastEvent({
                title: "Error loading donation table",
                message: error.message,
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
    }
}