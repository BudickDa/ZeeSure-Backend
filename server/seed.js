import Chance from 'chance';
import {Meteor} from 'meteor/meteor';
import {Insurances} from '/api/insurances';

const chance = new Chance(1337);

Insurances.remove({});

Meteor.users.find().forEach(user => {
    const max = chance.integer({max: 7});
    for (let i = 0; i < max; i++) {
        let price = chance.euro();
        let word = chance.word()
        Insurances.insert({
            userId: user._id,
            confirmed: chance.bool(),
            price: price,
            name: chance.word(),
            brand: word.charAt(0).toUpperCase() + word.slice(1),
            ean: chance.guid(),
            date: chance.date(),
            backers: [
                {userId: chance.guid(), price: chance.euro({max: price})}
            ],
            deniers: [
                user._id
            ]
        });
    }
});


for (let i = 0; i < 22; i++) {
    let price = chance.euro();
    let word = chance.word()
    Insurances.insert({
        userId: chance.guid(),
        confirmed: false,
        price: price,
        name: chance.word(),
        brand: word.charAt(0).toUpperCase() + word.slice(1),
        ean: chance.guid(),
        date: chance.date(),
        backers: [
            {userId: chance.guid(), price: chance.euro({max: price})}
        ],
        deniers: [
        ]
    });
}