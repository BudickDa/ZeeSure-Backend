import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';
import {Promise} from 'meteor/promise';
import {check, Match} from 'meteor/check';


export const Insurances = new Mongo.Collection('insurances');

Meteor.methods({
    /**
     * User can apply for an insurance. He can define price, product and duration in month
     * @param price
     * @param product
     * @param month
     */
    applyForInsurance(price, product, month, imageAsBase64){
        check(imageAsBase64, String);
        check(price, Number);
        check(product, {
            name: String,
            brand: String,
            ean: Match.maybe(String)
        });
        check(month, Number);
        let risk = false;
        let officialPrice;
        if (product.ean) {
            getPriceByEan(product.ean).then(price => {
                officialPrice = price;
            });
        } else {
            getPriceByName(product.name).then(price => {
                officialPrice = price;
            });
        }
        if (officialPrice === -1) {
            console.log('Price not found...');
        } else if (officialPrice < price) {
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
            risk: risk,
            image: imageAsBase64
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
    },
    getPriceByName(name){
        check(name, String);
        return getPriceByName(name);
    }
});

function getPriceByEan(eanCode) {
    const url = "https://api.siroop.ch/product/ean";
    const key = "?apikey=8ccd66bb1265472cbf8bed4458af4b07";
    const requestUrl = `${url}${eanCode}${key}`;
    return new Promise(function (resolve, reject) {
        HTTP.get(requestUrl, function (err, response) {
            if (err) {
                reject(err);
            }
            if (response.statusCode === 200) {
                resolve(_.first(response.data).price / 100);
            } else {
                resolve(-1);
            }
        });
    });
}

function getPriceByName(name) {
    const url = "https://api.siroop.ch/product/search/";
    const key = "?apikey=8ccd66bb1265472cbf8bed4458af4b07";
    const requestUrl = `${url}${key}&search=${name}`;
    return new Promise(function (resolve, reject) {
        HTTP.get(requestUrl, function (err, response) {
            if (err) {
                reject(err);
            }
            if (response.statusCode === 200) {
                const item = _.first(response.data);
                if(item){
                    resolve(item.price / 100);
                }else{
                    resolve(0);
                }

            } else {
                resolve(0);
            }
        });
    });
}
