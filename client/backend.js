import {Template} from 'meteor/templating';
import {Insurances} from '/api/insurances';


Template.backend.onCreated(function () {
    this.subscribe('unconfirmedInsurances');
});


Template.backend.helpers({
    insurances(){
        return Insurances.find();
    }
});