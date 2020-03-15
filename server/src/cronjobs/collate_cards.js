const _ = require('lodash');
const { Database } = require('../modules/database');

/**
 * Pulls deck metadata from the database.
 * - Number of entries in the `players` table
 * - Count of each card that appears at least once in a decklist
 * - Count of each card that appears in a winning decklist
 * @function extractCardData
 * @param {Object<Database>} database Database to run the queries against
 * @returns {Object}
 */
async function extractCardData(database) {
    const SELECT_ALL_CARDS = 'SELECT jsonb_object_keys(players.decklist) as name FROM players WHERE players.is_verified=true';
    const SELECT_WINNING_CARDS = `${SELECT_ALL_CARDS} AND players.is_winner=true`;
    const [numDecks] = await database.sequelize.query(
        'SELECT count(*) FROM players',
    );
    const [allCardsData] = await database.sequelize.query(
        `SELECT cards.name, count(cards.name) FROM (${SELECT_ALL_CARDS}) cards GROUP BY cards.name`,
    );
    const [allWinningCardsData] = await database.sequelize.query(
        `SELECT cards.name, count(cards.name) FROM (${SELECT_WINNING_CARDS}) cards GROUP BY cards.name`,
    );
    return {
        cards: allCardsData,
        winningCards: allWinningCardsData,
        numDecks: Number(_.first(numDecks).count),
    };
}

function toObject(obj, card) {
    // Initialize wins and win_rate to 0
    return Object.assign(obj, {
        [card.name]: {
            count: Number(card.count),
            wins: 0,
            win_rate: 0.0,
        },
    });
}

function calculateStats(cards, winningCards, numDecks) {
    const PRECISION = 6;
    const cardsObj = cards.reduce(toObject, {});
    winningCards.forEach((card) => {
        const winCount = Number(card.count);
        cardsObj[card.name].wins = winCount;
        cardsObj[card.name].win_rate = _.round(winCount / cardsObj[card.name].count, PRECISION);
    });
    return Object.entries(cardsObj).map(([name, data]) => ({
        name,
        count: data.count,
        appearance_rate: _.round(data.count / numDecks, PRECISION),
        wins: data.wins,
        win_rate: data.win_rate,
    }));
}

async function collateCards() {
    const database = new Database();
    const { cards, winningCards, numDecks } = await extractCardData(database);
    const stats = calculateStats(cards, winningCards, numDecks);
    await database.Report.upsert({
        name: 'card_data',
        data: stats,
    });
}

module.exports = {
    collateCards,
};
