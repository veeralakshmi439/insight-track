const axios = require('axios');

class SAPCRMAdapter {
    constructor(clientId, clientSecret, username, password) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.username = username;
        this.password = password;
        this.accessToken = null;
    }

    async authenticate() {
        const url = 'https://example.sap.com/oauth/token';
        const data = new URLSearchParams({
            'grant_type': 'password',
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'username': this.username,
            'password': this.password
        });

        const response = await axios.post(url, data);
        this.accessToken = response.data.access_token;
    }

    async getData(endpoint) {
        const headers = {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
        };
        const url = `https://example.sap.com/${endpoint}`;

        const response = await axios.get(url, { headers });
        return response.data;
    }
}

module.exports = SAPCRMAdapter;

// Example usage
// const sapCRM = new SAPCRMAdapter(clientId, clientSecret, username, password);
// sapCRM.authenticate().then(() => {
//     sapCRM.getData('your-endpoint').then(data => {
//         console.log(data);
//     });
// });
