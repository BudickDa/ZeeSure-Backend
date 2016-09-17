import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Insurances = new Mongo.Collection('insurances');

Meteor.methods({
    applyForInsurance(price, product){
        check(price, Number);
        check(product, {
            name: String,
            brand: String,
            ean: String
        });
        const insurance = {
            userId: this.userId,
            price: price,
            name: product.name,
            brand: product.brand,
            ean: product.ean,
            backers: [],
            deniers: []
        };
        Insurances.insert(insurance);
    },
    backInsurance(_id, money){
        check(_id, String);
        check(money, Number);
        Insurances.update(_id, {
            $push: {
                backers: {userId: this.userId, money: money}
            }
        });
    },
    denyInsurance(_id){
        check(_id, String);
        //todo: check if user is allowed to do this
        Insurances.update(_id, {
            $push: {
                deniers: this.userId
            }
        });
    },
    confirmInsurance(_id){
        check(_id, String);
        //todo: check if user is allowed to do this
        Insurances.update(_id, {
            $set: {
                date: new Date(),
                confirmed: true
            }
        });
    }
});
