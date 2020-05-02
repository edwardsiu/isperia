const { Command } = require('../command');
const { Roles } = require('../../enums');

test('Validates guild presence', async () => {
    const command = new Command({
        name: 'test',
        description: 'description',
        help: () => 'help',
        roles: [ Roles.GUILD ],
        resolver: () => 'Success',
    })
    const ctx = {
        message: {
            guild: { id: 'guildid' },
        },
    };
    const data = await command.resolve(ctx);
    expect(data).toBe('Success');
});

test('Returns undefined without guild presence', async () => {
    const command = new Command({
        name: 'test',
        description: 'description',
        help: () => 'help',
        roles: [Roles.GUILD],
        resolver: () => 'Success',
    })
    const ctx = {
        message: {},
    };
    const data = await command.resolve(ctx);
    expect(data).toBe(undefined);
});
