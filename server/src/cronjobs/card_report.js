const _ = require('lodash');
const { sequelize, Report } = require('../modules/models');
const { Reports } = require('../modules/enums');

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

/**
 * Pulls card metadata from the database at the specified column.
 * - Number of entries in the `players` table
 * - Count of each card that appears at least once in a decklist
 * - Count of each card that appears in a winning decklist
 * @function extractCardData
 * @param {Object<Database>} database Database to run the queries against
 * @returns {Object}
 */
async function extractCardData(column) {
    const SELECT_ALL_CARDS = `SELECT jsonb_object_keys(Players.deck->${column}) as name FROM Players WHERE Players.isVerified=true`;
    const SELECT_WINNING_CARDS = `${SELECT_ALL_CARDS} AND Players.isWinner=true`;
    const [numDecks] = await sequelize.query(
        'SELECT count(*) FROM players WHERE players.isVerified=true',
    );
    const [allCardsData] = await sequelize.query(
        `SELECT cards.name, count(cards.name) FROM (${SELECT_ALL_CARDS}) cards GROUP BY cards.name`,
    );
    const [allWinningCardsData] = await sequelize.query(
        `SELECT cards.name, count(cards.name) FROM (${SELECT_WINNING_CARDS}) cards GROUP BY cards.name`,
    );
    return {
        cards: allCardsData,
        winningCards: allWinningCardsData,
        numDecks: Number(_.first(numDecks).count),
    };
}

function calculateCardStats(cards, winningCards, numDecks) {
    const PRECISION = 6;
    const cardsObj = cards.reduce(toObject, {});
    winningCards.forEach((card) => {
        const winCount = Number(card.count);
        cardsObj[card.name].wins = winCount;
        cardsObj[card.name].win_rate = _.round(winCount / cardsObj[card.name].count, PRECISION);
    });
    return Object.entries(cardsObj).map(([name, data]) => ({
        name,
        usage: data.count,
        usage_rate: _.round(data.count / numDecks, PRECISION),
        wins: data.wins,
        win_rate: data.win_rate,
    }));
}

async function extractAndTransformCardData(column) {
    const { cards, winningCards, numDecks } = await extractCardData(column);
    const stats = calculateCardStats(cards, winningCards, numDecks);
    return stats;
}

async function generateCardReport() {
    const cardData = await extractAndTransformCardData('mainboard');
    await Report.upsert({
        name: Reports.CARD_DATA,
        data: cardData,
    });
    const commanderData = await extractAndTransformCardData('commanders');
    await Report.upsert({
        name: Reports.COMMANDER_DATA,
        data: commanderData,
    });
}

module.exports = {
    generateCardReport,
};
