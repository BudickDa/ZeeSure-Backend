import {Template} from 'meteor/templating';
import {Insurances} from '/api/insurances'

Template.insurances.onCreated(function () {
    this.subscribe('myInsurances');
});

Template.insurances.helpers({
    insurances(){
        return Insurances.find();
    },
    count(){
        return Insurances.find().count();
    }
});