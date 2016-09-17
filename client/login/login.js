import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';

Template.login.events({
    'click .js-login'(){
        Meteor.loginWithFacebook({}, () => {
            FlowRouter.go('/');
        });
    }
});
