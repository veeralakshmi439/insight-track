const { app } = require('@azure/functions');

app.timer('timerTrigger1', {
    schedule: '* * * * * *',
    handler: (myTimer, context) => {
        context.log('Timer function processed request.');
    }
});
