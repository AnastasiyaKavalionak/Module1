'use strict';

const country = 'India';

const request = require('request-promise');
const options = {
    method: 'Get',
    uri: 'http://services.groupkt.com/country/get/all',
    json: true
};

request(options).then(function (response) {
    let  count = 0;
    for (let i = 0; i < response.RestResponse.result.length; i++) {
        if (country === response.RestResponse.result[i].name) {
            console.log(response.RestResponse.result[i]);
            break;
        }
        count++;
    }
    if (count === response.RestResponse.result.length){
        console.log('Unknown country');
    }
});