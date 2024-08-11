const axios = require('axios');
const { Buffer } = require('buffer');

class FreshdeskAdapter {
    constructor(apiKey, domain) {
        this.apiKey = apiKey;
        this.domain = domain;
    }

    async getData(endpoint) {
        const url = `https://${this.domain}.freshdesk.com/api/v2/${endpoint}`;

        const response = await axios.get(url, {
            auth: {
                username: this.apiKey,
                password: 'X'
            }
        });
        const records = response.data;

        return records.map(record => ({
            id: record.id,
            name: record.name,
            email: record.email || '',
            phone: record.phone || ''
        }));
    }
}

module.exports = FreshdeskAdapter;
