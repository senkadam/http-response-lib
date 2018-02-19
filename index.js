/**
 * Created by ejdy on 22.9.17.
 */

const http = require('http');
const _ = require('lodash');

const awsResponse = (response) => {
   if(response.body && _.isObject(response.body)){
       response.body = JSON.stringify(response.body);
   }

   return response;
};

module.exports.created = (body = {}) => {

    const response = body ? {statusCode: 201, body} : {statusCode :201};
    console.info(JSON.stringify(response));
    return awsResponse(response);
};

module.exports.okOrNotFound = (body) => {
    return (_.isEmpty(body) ? module.exports.notFound(): module.exports.ok(body));
};

module.exports.ok = (body) => {
    console.info('200 OK - body: ', JSON.stringify(body,null,2));
    return awsResponse({statusCode:200, body})
};

module.exports.notFound = () => {
    return awsResponse({statusCode:404});
};

module.exports.error = (err) =>  {
    console.error(err);
    let statusCode=500;
    if(_.isObject(err) && err.statusCode) {
        statusCode = err.statusCode;
    }
    return awsResponse({statusCode, body: err});
};


