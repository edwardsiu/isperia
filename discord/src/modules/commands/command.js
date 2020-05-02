const _ = require('lodash');
const { Embed, Fmt } = require('../embeds');
const { Roles } = require('../enums');

class Command {
    constructor({ name, description, help, roles, resolver }) {
        this.name = name;
        this.description = description || '';
        this._help = help;
        this.roles = roles.reduce((o, role) => Object.assign(o, { [role]: true }), {});
        this.resolver = resolver;
    }

    help(argv) {
        const text = this._help ? this._help(argv) : this.description;
        return Embed.info({
            title: `Help: ${Fmt.code(this.name)}`,
            description: text,
        });
    }

    resolve(ctx, argv) {
        if (!this.validateRoles(ctx)) return;
        return this.resolver(ctx, ...argv);
    }

    validateRoles(ctx) {
        if (this.roles[Roles.GUILD] && !ctx.message.guild) {
            return false;
        }
        if (this.roles[Roles.ADMIN] && !_.get(ctx, `user.roles.${Roles.ADMIN}`)) {
            return false;
        }
        if (this.roles[Roles.OWNER] && !_.get(ctx, `user.roles.${Roles.OWNER}`)) {
            return false;
        }
        return true;
    }
}

module.exports = {
    Command,
};
