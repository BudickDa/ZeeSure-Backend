import {Template} from 'meteor/templating';
import {Insurances} from '/api/insurances';
import moment from 'moment';

Template.investements.onCreated(function () {
    this.subscribe('backedInsurances');
});

Template.investements.helpers({
    investements(){
        return Insurances.find().map(insurance => {
            return {
                name: insurance.name,
                brand: insurance.brand,
                date: moment(insurance.date).format('M/DD/YYYY'),
                duration: moment().from(insurance.date)
            }
        });
    },
    count(){
        return Insurances.find().count();
    }
});