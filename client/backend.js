import {Template} from 'meteor/templating';
import {Insurances} from '/api/insurances';
import {Chance} from 'chance';

const chance = new Chance(1234);
Template.backend.onCreated(function () {
    this.subscribe('unconfirmedInsurances');
});


Template.backend.helpers({
    insurances(){
        return Insurances.find().map(doc => {
            doc.riskP = `${chance.integer({min: 22, max: 98})} %`;
        });
    }
});