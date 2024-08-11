const axios = require('axios');
const { Buffer } = require('buffer');

class InsightlyAdapter {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getData(endpoint) {
        const url = `https://api.insightly.com/v3.1/${endpoint}`;
        const headers = {
            'Authorization': `Basic ${Buffer.from(this.apiKey).toString('base64')}`
        };

        const response = await axios.get(url, { headers });
        const records = response.data;

        return records.map(record => ({
            id: record.CONTACT_ID,
            name: `${record.FIRST_NAME} ${record.LAST_NAME}`,
            email: record.EMAIL_ADDRESS || '',
            phone: record.PHONE_NUMBER || ''
        }));
    }
}

module.exports = InsightlyAdapter;
