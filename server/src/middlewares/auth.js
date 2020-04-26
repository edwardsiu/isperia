const jwt = require('koa-jwt');
const jwksRsa = require('jwks-rsa');
/*
 * To authenticate to the server:
 * POST https://isperia.auth0.com/oauth/token
 * Content-Type: application/x-www-form-urlencoded
 * Body:
 *   client_id: AUTH0_APPLICATION_CLIENT_ID
 *   client_secret: AUTH0_APPLICATION_CLIENT_SECRET
 *   grant_type: 'client_credentials'
 *   audience: 'https://isperia.server'
 * Response: {
 *   "access_token": ACCESS_TOKEN,
 *   "expires_in": SECONDS_TIL_EXPIRATION,
 *   "token_type": "Bearer"
 * }
 *
 * Authenticated requests should use the Authorization header with value "Bearer ACCESS_TOKEN"
 */
const authenticate = jwt({
    secret: jwksRsa.koaJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://isperia.auth0.com/.well-known/jwks.json',
    }),
    audience: 'https://isperia.server',
    issuer: 'https://isperia.auth0.com/',
    algorithms: ['RS256'],
});

module.exports = { authenticate };
