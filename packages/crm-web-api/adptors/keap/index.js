const axios = require('axios');

class KeapAdapter {
    constructor(clientId, clientSecret, redirectUri, refreshToken) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.refreshToken = refreshToken;
        this.accessToken = null;
    }

    async authenticate() {
        const url = 'https://api.infusionsoft.com/token';
        const data = new URLSearchParams({
            'grant_type': 'refresh_token',
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'refresh_token': this.refreshToken,
            'redirect_uri': this.redirectUri
        });

        const response = await axios.post(url, data);
        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;
    }

    async getData(endpoint) {
        const headers = {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
        };
        const url = `https://api.infusionsoft.com/crm/rest/v1/${endpoint}`;

        const response = await axios.get(url, { headers });
        return response.data;
    }
}

// Example usage
// const keap = new KeapAdapter(clientId, clientSecret, redirectUri, refreshToken);
// keap.authenticate().then(() => {
//     keap.getData("contacts").then(data => {
//         console.log(data);
//     });
// });
