import Chance from 'chance';
import {Meteor} from 'meteor/meteor';
import {Insurances} from '/api/insurances';

const chance = new Chance(1337);

Insurances.remove({});

Meteor.users.find().forEach(user => {
    for (let i = 0; i < 7; i++) {
        let price = chance.euro();
        Insurances.insert({
            userId: user._id,
            confirmed: chance.bool(),
            price: price,
            name: chance.word(),
            brand: chance.word(),
            ean: chance.guid(),
            date: chance.date(),
            backers: [
                {userId: chance.guid(), price: chance.euro({max: price})}
            ],
            deniers: []
        });
    }
});
