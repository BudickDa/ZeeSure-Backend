import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Insurances} from '/api/insurances';
import {ReactiveVar} from 'meteor/reactive-var';

const reactUserId = ReactiveVar('');

Template.invest.onCreated(function () {
    this.subscribe('invest');
});

Template.invest.helpers({
    investments(){
        return Insurances.find();
    },
    user(){
        const userId = reactUserId.get();
        if()
        return Meteor.users.find({
            _id: {
                $ne: Meteor.userId()
            }
        });
    }
});
