import {Template} from 'meteor/templating';

Template.main.onRendered(() => {
    componentHandler.upgradeDom();
});