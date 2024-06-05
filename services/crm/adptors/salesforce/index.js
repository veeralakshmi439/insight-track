const axios = require('axios');

class SalesforceAdapter {
    constructor(clientId, clientSecret, username, password, securityToken) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.username = username;
        this.password = password;
        this.securityToken = securityToken;
        this.accessToken = null;
        this.instanceUrl = null;
    }

    async authenticate() {
        const url = "https://login.salesforce.com/services/oauth2/token";
        const data = new URLSearchParams({
            "grant_type": "password",
            "client_id": this.clientId,
            "client_secret": this.clientSecret,
            "username": this.username,
            "password": `${this.password}${this.securityToken}`
        });

        const response = await axios.post(url, data);
        this.accessToken = response.data.access_token;
        this.instanceUrl = response.data.instance_url;
    }

    async getData(query) {
        const headers = {
            "Authorization": `Bearer ${this.accessToken}`,
            "Content-Type": "application/json"
        };
        const url = `${this.instanceUrl}/services/data/v52.0/query`;
        const params = { q: query };

        const response = await axios.get(url, { headers, params });
        const records = response.data.records;

        return records.map(record => ({
            id: record.Id,
            name: record.Name,
            email: record.Email || '',
            phone: record.Phone || ''
        }));
    }
}

module.exports = SalesforceAdapter;
