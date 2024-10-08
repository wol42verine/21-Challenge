const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token provided');
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      req.user = data;
      // console.log('Token decoded:', data);
    } catch(err) {
      console.log('Invalid token', err);
    }

    return req;
  },
  
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};