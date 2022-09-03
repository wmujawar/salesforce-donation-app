import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import DONATION_OBJECT from '@salesforce/schema/Donation__c';
import DATE_FIELD from '@salesforce/schema/Donation__c.Donation_Date__c';
import AMOUNT_FIELD from '@salesforce/schema/Donation__c.Amount__c';
import PERSONA_FIELD from '@salesforce/schema/Donation__c.Persona__c';
import EVENT_FIELD from '@salesforce/schema/Donation__c.Event__c';

export default class MakeDonation extends LightningElement {

    objectName = DONATION_OBJECT;
    dateField = DATE_FIELD;
    amountField = AMOUNT_FIELD;
    personaField = PERSONA_FIELD;
    eventField = EVENT_FIELD;

    resetHandler() {
        const inputFields = this.template.querySelectorAll('lightning-input-field');

        if (inputFields)
            inputFields.forEach(field => field.reset());
     }

    successHandler(event) {
        const successEvent = new ShowToastEvent({
            title: "Success!",
            message: "Donation made successfully " + event.detail.id,
            variant: "success"
        });

        this.dispatchEvent(successEvent);
    }

    errorHandler(event) {
        const failedEvent = new ShowToastEvent({
            title: 'Failed!',
            message: event.detail.detail,
            variant: 'error'
        });

        this.dispatchEvent(failedEvent);
    }
}