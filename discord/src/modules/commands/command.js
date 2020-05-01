const { Embed } = require('../embeds');

class Command {
    constructor({ name, description, help, resolver }) {
        this.name = name;
        this.description = description || '';
        this._help = help;
        this.resolver = resolver;
    }

    help(argv) {
        const text = this._help ? this._help(argv) : this.description;
        return Embed.info({
            title: `Help: \`${this.name}\``,
            description: text,
        });
    }

    resolve(ctx, argv) {
        return this.resolver(ctx, ...argv);
    }
}

module.exports = {
    Command,
};
