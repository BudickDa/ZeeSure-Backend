import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

FlowRouter.route('/login', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'login'});
    }
});

FlowRouter.route('/', {
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()===null) {
            redirect('/login');
        }
    }],
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'start'});
    }
});

FlowRouter.route('/scanner', {
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()===null) {
            redirect('/login');
        }
    }],
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'scanner'});
    }
});

FlowRouter.route('/insurances', {
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()===null) {
            redirect('/login');
        }
    }],
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'insurances'});
    }
});

FlowRouter.route('/investments', {
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()===null) {
            redirect('/login');
        }
    }],
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'investments'});
    }
});

FlowRouter.route('/invest', {
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()===null) {
            redirect('/login');
        }
    }],
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'invest'});
    }
});
FlowRouter.route('/settings', {
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()===null) {
            redirect('/login');
        }
    }],
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'settings'});
    }
});

FlowRouter.route('/backend', {
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()===null) {
            redirect('/login');
        }
    }],
    action: function(params, queryParams) {
        BlazeLayout.render('backendLayout', {content: 'backend'});
    }
});