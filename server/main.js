import { Meteor } from 'meteor/meteor';

import '/api/server/publications';
import '/api/server/user';
import '/api/insurances';


import '/server/seed'
Meteor.startup(() => {
  // code to run on server at startup
});
