const { CronJob } = require('cron');
const { collateCards } = require('./collate_cards');

// Runs once an hour on the 0 mark
const collateCardsJob = new CronJob('0 0 * * * *', collateCards);

function startAll() {
    collateCardsJob.start();
}

module.exports = {
    startAll,
};
