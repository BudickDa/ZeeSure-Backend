import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {HTTP} from 'meteor/http';
import {ReactiveVar} from 'meteor/reactive-var';

const reactItemName = new ReactiveVar('');
const reactItemPrice = new ReactiveVar(0);

var localMediaStream = null
var canvas = null;
var ctx = null;
var video = null;
var dialog = null;


Template.scanner.onRendered(function () {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    video = document.querySelector('video');

    const errorCallback = function (err) {
        console.error(err);
    };

    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true, video: true}, function (stream) {
            localMediaStream = stream;
            video.src = window.URL.createObjectURL(stream);
        }, errorCallback);
    } else {
        video.src = 'somevideo.webm'; // fallback.
    }


    dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
});

Template.scanner.helpers({
    name(){
        return reactItemName.get();
    },
    price(){
        return reactItemPrice.get();
    },
    priceMin(){
        return parseFloat(reactItemPrice.get()) - parseFloat(reactItemPrice.get()) * 0.5;
    },
    priceMax(){
        return parseFloat(reactItemPrice.get()) + parseFloat(reactItemPrice.get()) * 0.5;
    }
});

Template.scanner.events({
    'click #show-dialog'(){
        dialog.showModal();
    },
    'click .close'(){
        dialog.close();
    },

    'click .js-tap'(){
        if (localMediaStream) {
            ctx.drawImage(video, 0, 0);
            const json = {
                requests: [
                    {
                        image: {
                            content: canvas.toDataURL('image/jpeg').replace('data:image/jpeg;base64,', '')
                        },
                        features: [
                            {
                                type: 'LABEL_DETECTION',
                                maxResults: 1
                            }
                        ]
                    }
                ]
            };
            HTTP.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDSJe522U2VYYCz7I1x6qGVnkTmnjhV7jE', {data:json}, function (err, data) {
                if (err) {
                    console.error(err);
                }
                const responses = JSON.parse(data.content).responses;
                if(!_.first(responses)){
                    return;
                }
                if(!_.first(responses).labelAnnotations){
                    return;
                }
                const annotations = _.first(_.first(responses).labelAnnotations);
                const name = annotations.description;
                Meteor.call('getPriceByName', name, function(err, price){
                    reactItemPrice.set(Math.floor(price));
                });
                reactItemName.set(name);
            });
        }
    },
    'change .js-slider'(event){
        console.log(event.currentTarget.value);
        reactItemPrice.set(event.currentTarget.value);
    }
});
