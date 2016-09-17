import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';


export const Insurances = new Mongo.Collection('insurances');

Meteor.methods({
    /**
     * User can apply for an insurance. He can define price, product and duration in month
     * @param price
     * @param product
     * @param month
     */
    applyForInsurance(price, product, month){
        check(price, Number);
        check(product, {
            name: String,
            brand: String,
            ean: String
        });
        check(month, Number);
        let risk = false;
        const officialPrice = getPrice(product.ean);
        if(officialPrice===-1){
            console.log('Price not found...');
        }else if(officialPrice<price){
            //todo: something is wrong... the insuree wants more money than the official value.
            risk = true;
        }
        const insurance = {
            userId: this.userId,
            price: price,
            name: product.name,
            brand: product.brand,
            ean: product.ean,
            month: month,
            backers: [],
            deniers: [],
            risk: risk
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
    },
    getInvestment(){
        return _.first(Insurances.find().fetch());
    }
});

function getPrice(eanCode) {
    const url = "https://api.siroop.ch/product/ean/";
    const key = "/?apikey=8ccd66bb1265472cbf8bed4458af4b07";
    const requestUrl = `${url}${eanCode}${key}`;
    const response = HTTP.get(requestUrl);
    if (response.statusCode === 200) {
        return _.first(response.data).price/100
    }else{
        return -1;
    }
}

console.log(getPrice('3068320014067'));
