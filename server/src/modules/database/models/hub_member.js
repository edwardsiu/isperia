const { UUIDV4 } = require('sequelize');

const HubMember = {
    name: 'hub_member',
    schema: {
        user_id: {
            type: UUIDV4,
            primaryKey: true,
        },
        hub_id: {
            type: UUIDV4,
            primaryKey: true,
        },
    },
    options: {},
};

module.exports = {
    HubMember,
};
