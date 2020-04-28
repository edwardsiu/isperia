const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const { Player } = require('../../modules/models');

async function getTopPlayers(ctx) {
    const { eventId } = ctx.params;
    const players = await Player.findAll({
        where: {
            eventId,
            isVerified: true,
        },
    });
    if (!players) {
        ctx.status = HttpStatus.NOT_FOUND;
        return;
    }
    const results = players.reduce((o, player) => {
        if (!_.has(o, player.userId)) {
            o[player.userId] = {
                wins: 0,
                losses: 0,
                total: 0,
            };
        }
        if (player.isWinner) {
            o[player.userId].wins += 1;
        } else {
            o[player.userId].losses += 1;
        }
        o[player.userId].total += 1;
        return o;
    }, {});
    const leaderboard = Object.entries(results).map(([userId, record]) => ({
        userId,
        winRate: record.wins / record.total,
        ...record,
    })).sort((a, b) => b.wins - a.wins);
    ctx.status = HttpStatus.OK;
    ctx.body = {
        leaderboard,
        sortOrder: 'wins',
    };
}

module.exports = {
    getTopPlayers,
};
