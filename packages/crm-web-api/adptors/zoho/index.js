const axios = require('axios');

class ZohoAdapter {
    constructor(clientId, clientSecret, refreshToken) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
        this.accessToken = null;
    }

    async authenticate() {
        const url = 'https://accounts.zoho.com/oauth/v2/token';
        const params = new URLSearchParams({
            'refresh_token': this.refreshToken,
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'grant_type': 'refresh_token'
        });

        const response = await axios.post(url, params);
        this.accessToken = response.data.access_token;
    }

    async getData(module) {
        const headers = {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`
        };
        const url = `https://www.zohoapis.com/crm/v2/${module}`;

        const response = await axios.get(url, { headers });
        const records = response.data.data;

        return records.map(record => ({
            id: record.id,
            name: record.Full_Name || '',
            email: record.Email || '',
            phone: record.Phone || ''
        }));
    }
}

module.exports = ZohoAdapter;
