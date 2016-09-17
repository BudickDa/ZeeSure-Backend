import {Meteor} from 'meteor/meteor';
import {Insurances} from '/api/insurances';

Meteor.publish('myInsurances', function () {
    return Insurances.find({
        userId: this.userId,
        confirmed: true
    });
});

Meteor.publish('backedInsurances', function () {
    return Insurances.find({
        backers: this.userId
    });
});

Meteor.publish('deniedInsurances', function () {
    return Insurances.find({
        deniers: this.userId
    });
});
