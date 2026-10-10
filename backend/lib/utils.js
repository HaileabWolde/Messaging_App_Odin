const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, '..', 'id_rsa_priv.pem'),
  'utf8'
);

function issueJWT(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const signedToken = jsonwebtoken.sign(
    payload,
    PRIV_KEY,
    {
      expiresIn: '7d',
      algorithm: 'RS256'
    }
  );

  return {
    token: 'Bearer ' + signedToken,
    expires: '7d'
  };
}

module.exports.issueJWT = issueJWT;