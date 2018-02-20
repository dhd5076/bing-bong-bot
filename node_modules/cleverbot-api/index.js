'use strict';

const request = require('request');

class CleverbotAPIError extends Error {
    constructor(message) {
        super(message);
        this.name = "CleverbotAPIError";
    }
}

class CleverbotAPI {
    constructor(key) {
        this.key = key;
    }
    getReply(options = {}, callback) {
        let url = `https://www.cleverbot.com/getreply?wrapper=cleverbot-api&key=${this.key}`;
        url += (options.input ? `&input=${options.input}` : '');
        url += (options.cs ? `&cs=${options.cs}` : '');
        request.get(url, (error, response, body) => {
            if(error) callback(error);
            if(response.statusCode === 200) {
                try {
                    const parsedResponse = JSON.parse(body);
                    callback(undefined, parsedResponse);
                } catch(error) {
                    callback(new CleverbotAPIError('Invalid response!'));
                }
            } else {
                switch(response.statusCode) {
                    case 401:
                        callback(new CleverbotAPIError('Missing or invalid API key!'));
                        break;
                    case 404:
                        callback(new CleverbotAPIError('API not found!'));
                        break;
                    case 413:
                        callback(new CleverbotAPIError('Request too large!'));
                        break;
                    case 502:
                    case 504:
                        callback(new CleverbotAPIError('Unable to get reply from API server!'));
                        break;
                    case 503:
                        callback(new CleverbotAPIError('Too many requests!'));
                        break;
                    default:
                        callback(new CleverbotAPIError('Uknown error!'));
                }
            }
        });
    }
}

module.exports = CleverbotAPI;
