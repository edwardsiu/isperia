const { Op } = require('sequelize');
const { EventStatus } = require('../../modules/enums');
const { sequelize, Event, EventMember, Game, Player } = require('../../modules/models');

/**
 * @function createGameWithPlayers
 * @param {string} eventId Id of the event the game is part of
 * @param {string[]} userIds Ids of all users participating in the game
 * @param {string} winnerId Id of the winning user
 * @param {string} source Source of the game (ie. `discord`)
 * @returns {Promise<any>}
 */
async function createGameWithPlayers(eventId, userIds, winnerId, source) {
    const response = await sequelize.transaction(async (t) => {
        const event = await Event.findByPk(eventId, { transaction: t });
        if (!event || event.status !== EventStatus.ACTIVE) {
            throw new Error(`Invalid or inactive event ${eventId}`);
        }
        const eventMembers = await EventMember.findAll({
            where: {
                eventId,
                userId: { [Op.in]: userIds },
            },
        }, { transaction: t });
        if (!eventMembers || eventMembers.length !== userIds.length) {
            throw new Error('Not all users are registered to the event');
        }
        const game = await Game.create({
            eventId,
            source,
        }, { transaction: t });
        const players = await Promise.all(
            userIds.map((userId) => Player.create({
                gameId: game.id,
                userId,
                eventId: event.id,
                isWinner: winnerId === userId,
            }, { transaction: t })),
        );
        return {
            game,
            players,
        };
    });
    return response;
}

async function confirmPlayer(gameId, userId) {
    const game = await Game.findByPk(gameId);
    const players = await Player.findAll({
        where: { gameId },
    });
    await sequelize.transaction(async (t) => {
        const player = players.find((p) => p.userId === userId);
        player.isVerified = true;
        if (!players.find((p) => !p.isVerified)) {
            game.isVerified = true;
        }
        await Promise.all([
            game.save({ transaction: t }),
            player.save({ transaction: t }),
        ]);
    });
}

module.exports = {
    GameController: {
        createGameWithPlayers,
        confirmPlayer,
    },
};
