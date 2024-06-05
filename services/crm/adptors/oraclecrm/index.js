const axios = require('axios');

class OracleCRMAdapter {
    constructor(clientId, clientSecret, username, password) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.username = username;
        this.password = password;
        this.accessToken = null;
    }

    async authenticate() {
        const url = 'https://login.oracle.com/oam/oauth2/tokens';
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
        const url = `https://your_instance.crm.ocp.oraclecloud.com/crmRestApi/resources/latest/${endpoint}`;

        const response = await axios.get(url, { headers });
        const records = response.data.items;

        return records.map(record => ({
            id: record.Id,
            name: record.Name,
            email: record.EmailAddress || '',
            phone: record.PhoneNumber || ''
        }));
    }
}

module.exports = OracleCRMAdapter;
