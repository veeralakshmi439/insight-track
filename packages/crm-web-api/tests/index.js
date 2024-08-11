const SalesforceAdapter = require('../adptors/salesforce/index');
const DynamicsAdapter = require('../adptors/dynamics/index');
const HubSpotAdapter = require('../adptors/hubspot/index');
const ZohoAdapter = require('../adptors/zoho/index');
const FreshdeskAdapter = require('../adptors/freshdesk/index');
const InsightlyAdapter = require('../adptors/insightly/index');
const OracleCRMAdapter = require('../adptors/oraclecrm/index');
const KeapAdapter = require('../adptors/keap/index');
const SAPCRMAdapter = require('../adptors/sapcrm/index');

async function fetchDataFromCRMs(crmConfigs) {
    const promises = crmConfigs.map(async (config) => {
        let adapter;

        switch (config.type) {
            case 'salesforce':
                adapter = new SalesforceAdapter(config.clientId, config.clientSecret, config.username, config.password, config.securityToken);
                break;
            case 'dynamics':
                adapter = new DynamicsAdapter(config.clientId, config.clientSecret, config.tenantId, config.resource);
                break;
            case 'hubspot':
                adapter = new HubSpotAdapter(config.accessToken);
                break;
            case 'zoho':
                adapter = new ZohoAdapter(config.clientId, config.clientSecret, config.refreshToken);
                break;
            case 'freshdesk':
                adapter = new FreshdeskAdapter(config.apiKey, config.domain);
                break;
            case 'insightly':
                adapter = new InsightlyAdapter(config.apiKey);
                break;
            case 'oraclecrm':
                adapter = new OracleCRMAdapter(config.clientId, config.clientSecret, config.username, config.password);
                break;
            case 'keap':
                adapter = new KeapAdapter(config.clientId, config.clientSecret, config.redirectUri, config.refreshToken);
                break;
            case 'sapcrm':
                adapter = new SAPCRMAdapter(config.clientId, config.clientSecret, config.username, config.password);
                break;
            default:
                throw new Error(`Unsupported CRM type: ${config.type}`);
        }

        if (adapter.authenticate) {
            await adapter.authenticate();
        }

        const data = await adapter.getData(config.endpoint);
        return data;
    });

    const results = await Promise.all(promises);
    return results.flat();
}

// Example usage
const crmConfigs = [
    {
        type: 'hubspot',
        accessToken: 'pat-eu1-51dde2b1-3aac-44c7-8bf2-8d3e986eb645',
        endpoint: 'crm/v3/objects/contacts'
    },
    // Add more CRM configurations as needed
];

fetchDataFromCRMs(crmConfigs).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error fetching data from CRMs:', error);
});
