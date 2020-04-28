module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
            },
            savedDecks: {
                type: Sequelize.DataTypes.JSONB,
                defaultValue: {},
            },
        });
        await queryInterface.createTable('community', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
            },
            settings: {
                type: Sequelize.DataTypes.JSONB,
                defaultValue: {},
            },
        });
        await queryInterface.createTable('event', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            communityId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'community',
                    key: 'id',
                },
            },
            name: {
                type: Sequelize.DataTypes.STRING,
            },
            status: {
                type: Sequelize.DataTypes.STRING,
            },
            settings: {
                type: Sequelize.DataTypes.JSONB,
            },
        });
        await queryInterface.createTable('event_member', {
            userId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            eventId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'event',
                    key: 'id',
                },
            },
            lfg: {
                type: Sequelize.DataTypes.BOOLEAN,
            },
            lfgTimestamp: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            properties: {
                type: Sequelize.DataTypes.JSONB,
                allowNull: true,
            },
        });
        await queryInterface.createTable('game', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            eventId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'event',
                    key: 'id',
                },
            },
            source: {
                type: Sequelize.DataTypes.STRING,
            },
            isVerified: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
            },
        });
        await queryInterface.createTable('player', {
            userId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            gameId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'game',
                    key: 'id',
                },
            },
            eventId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'event',
                    key: 'id',
                },
            },
            isVerified: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isWinner: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            deck: {
                type: Sequelize.DataTypes.JSONB,
            },
        });
        await queryInterface.createTable('report', {
            name: {
                primaryKey: true,
                type: Sequelize.DataTypes.STRING,
            },
            data: {
                type: Sequelize.DataTypes.JSONB,
            },
        });
        await queryInterface.addIndex('player', {
            fields: ['deck'],
            using: 'gin',
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('report');
        await queryInterface.dropTable('player');
        await queryInterface.dropTable('game');
        await queryInterface.dropTable('event_member');
        await queryInterface.dropTable('event');
        await queryInterface.dropTable('community');
        await queryInterface.dropTable('user');
    },
};
