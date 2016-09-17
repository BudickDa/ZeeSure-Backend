import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {HTTP} from 'meteor/http';

ServiceConfiguration.configurations.upsert({
        service: "facebook"
    },
    {
        $set: {
            appId: "1609337562699308", //todo: put these into environment variables...
            secret: "c60ad7b07f91cb613b9680b6b86f2cd3", //todo: this should not be here... I know... ok. Shut up!
            requestPermissions: ['user_friends'],
            loginStyle: "popup"
        }
    }
);

Meteor.users.deny({
    update: function () {
        return true;
    }
});
Meteor.publish('me', function () {
    return Meteor.users.find(this.userId);
});

Accounts.onLogin(function (res) {
    const _id = res.user._id;
    const accessToken = res.user.services.facebook.accessToken;
    const id = res.user.services.facebook.id;
    try {
        const requestLists = HTTP.get(`https://graph.facebook.com/v2.7/${id}/friends?access_token=${accessToken}`);
        const friends = requestLists.data.data;
        const friendCount = requestLists.data.summary.total_count;

        Meteor.users.update({_id: _id}, {
            $set: {
                friendCount: friendCount,
                friends: friends
            }
        });
    } catch (e) {
        console.error(e);
    }
});
