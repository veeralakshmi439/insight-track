const axios = require('axios');

class HubSpotAdapter {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    async getData(endpoint) {
        const url = `https://api.hubapi.com/${endpoint}`;
        const headers = {
            Authorization: `Bearer ${this.accessToken}`
        };

        const response = await axios.get(url, { headers });
        const records = response.data.results;

        return records.map(record => ({
            id: record.id,
            name: `${record.properties.firstname} ${record.properties.lastname}`,
            email: record.properties.email || '',
            phone: record.properties.phone || ''
        }));
    }
}

module.exports = HubSpotAdapter;
