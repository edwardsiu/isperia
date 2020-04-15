const HttpStatus = require('http-status-codes');
const { User } = require('../../modules/models');

async function createUser(ctx) {
    const { name } = ctx.request.body;
    const user = await User.create({
        name,
    });
    ctx.body = { userId: user.id };
    ctx.status = HttpStatus.CREATED;
}

module.exports = {
    createUser,
};
