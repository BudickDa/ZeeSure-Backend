import {Template} from 'meteor/templating';
import {Insurances} from '/api/insurances';
import moment from 'moment';

Template.insurances.onCreated(function () {
    this.subscribe('myInsurances');
});

Template.insurances.helpers({
    insurances(){
        return Insurances.find().map(insurance => {
            return {
                name: insurance.name,
                brand: insurance.brand,
                date: moment(insurance.date).format('M/DD/YYYY'),
                duration: moment().from(insurance.date)
            };
        });
    },
    count(){
        return Insurances.find().count();
    }
});