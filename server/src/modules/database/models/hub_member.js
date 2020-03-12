const { UUID } = require('sequelize');

const HubMember = {
    name: 'hub_member',
    schema: {
        user_id: {
            type: UUID,
            primaryKey: true,
        },
        hub_id: {
            type: UUID,
            primaryKey: true,
        },
    },
    options: {},
};

module.exports = {
    HubMember,
};
