import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';

Template.start.helpers({
    'count'(){
        const user = Meteor.user();
        if (user && Array.isArray(user.friends)) {
            return user.friends.length;
        } else {
            return 0;
        }
    }
});