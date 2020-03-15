const { CronJob } = require('cron');
const { generateCardReport } = require('./card_report');

// Runs once an hour on the 0 mark
const cardReportJob = new CronJob('0 0 * * * *', generateCardReport);

function startAll() {
    cardReportJob.start();
}

module.exports = {
    startAll,
};
