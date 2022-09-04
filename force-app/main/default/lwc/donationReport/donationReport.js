import { LightningElement } from 'lwc';

export default class DonationReport extends LightningElement {

    monthValue = (new Date()).getMonth() + 1;
    yearValue = (new Date()).getFullYear();
    
    get monthOptions() {
        return [{ label: 'January', value: 1 }, { label: 'February', value: 2 }, { label: 'March', value: 3 }, { label: 'April', value: 4 }, { label: 'May', value: 5 }, { label: 'June', value: 6 }, { label: 'July', value: 7 }, { label: 'August', value: 8 }, { label: 'September', value: 9 }, { label: 'October', value: 10 }, { label: 'November', value: 11 }, { label: 'December', value: 12 }];
    }

    get yearOptions() {
        return [{ label: '2011', value: 2011 }, { label: '2012', value: 2012 }, { label: '2013', value: 2013 }, { label: '2014', value: 2014 }, { label: '2015', value: 2015 }, { label: '2016', value: 2016 }, { label: '2017', value: 2017 }, { label: '2018', value: 2018 }, { label: '2019', value: 2019 }, { label: '2020', value: 2020 }, { label: '2021', value: 2021 }, { label: '2022', value: 2022 }, { label: '2023', value: 2023 }, { label: '2024', value: 2024 }, { label: '2025', value: 2025 }, { label: '2026', value: 2026 }, { label: '2027', value: 2027 }, { label: '2028', value: 2028 }, { label: '2029', value: 2029 }, { label: '2030', value: 2030 }];
    }

    handleChange(event) {
        const label = event.target.label;
        const selectedValue = parseInt(event.detail.value);

        if (label === 'Month') {
            if (this.monthValue != selectedValue)
                this.monthValue = selectedValue;
        } else if (label === 'Year') {
            if (this.yearValue != selectedValue)
                this.yearValue = selectedValue;
        }
    }
}