const axios = require('axios');

class DynamicsAdapter {
    constructor(clientId, clientSecret, tenantId, resource) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.tenantId = tenantId;
        this.resource = resource;
        this.accessToken = null;
    }

    async authenticate() {
        const url = `https://login.microsoftonline.com/${this.tenantId}/oauth2/token`;
        const data = new URLSearchParams({
            "grant_type": "client_credentials",
            "client_id": this.clientId,
            "client_secret": this.clientSecret,
            "resource": this.resource
        });

        const response = await axios.post(url, data);
        this.accessToken = response.data.access_token;
    }

    async getData(entity) {
        const headers = {
            "Authorization": `Bearer ${this.accessToken}`,
            "Content-Type": "application/json"
        };
        const url = `${this.resource}/api/data/v9.1/${entity}`;

        const response = await axios.get(url, { headers });
        const records = response.data.value;

        return records.map(record => ({
            id: record.accountid,
            name: record.name,
            email: record.emailaddress1 || '',
            phone: record.telephone1 || ''
        }));
    }
}

module.exports = DynamicsAdapter;
