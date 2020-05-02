module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
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
            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },
        });
        await queryInterface.createTable('communities', {
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
            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },
        });
        await queryInterface.createTable('events', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            communityId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'communities',
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
            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },
        });
        await queryInterface.createTable('event_members', {
            userId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            eventId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'events',
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
            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },
        });
        await queryInterface.createTable('games', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            eventId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'events',
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
            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },
        });
        await queryInterface.createTable('players', {
            userId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            gameId: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'games',
                    key: 'id',
                },
            },
            eventId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'events',
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
            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },
        });
        await queryInterface.createTable('reports', {
            name: {
                primaryKey: true,
                type: Sequelize.DataTypes.STRING,
            },
            data: {
                type: Sequelize.DataTypes.JSONB,
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            },
        });
        await queryInterface.addIndex('players', {
            fields: ['deck'],
            using: 'gin',
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('reports');
        await queryInterface.dropTable('players');
        await queryInterface.dropTable('games');
        await queryInterface.dropTable('event_members');
        await queryInterface.dropTable('events');
        await queryInterface.dropTable('communities');
        await queryInterface.dropTable('users');
    },
};
