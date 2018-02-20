# CleverbotAPI
Simple library, interacting with cleverbot's api.

You can find information about the usage of the library in [it's wiki](https://github.com/Jqmey/cleverbot-api/wiki).

You can find information about the API and get an API key at [cleverbot.com/api](https://www.cleverbot.com/api).

## Example
```javascript
const CleverbotAPI = require('cleverbot-api');
const cleverbot = new CleverbotAPI('YOURAPIKEY');

cleverbot.getReply({
    input: 'Just a small town girl'
}, (error, response) => {
    if(error) throw error;
    console.log(response.input);
    console.log(response.output);
});
```