const { app } = require('@azure/functions');

app.serviceBusTopic('scan', {
    connection: 'webanalysermsgbus_SERVICEBUS',
    topicName: 'ob-ss-req-mb-tp',
    subscriptionName: 'sycn-req-ms-sub',
    handler: (message, context) => {
        context.log('Service bus topic function processed message:', message);
    }
});
