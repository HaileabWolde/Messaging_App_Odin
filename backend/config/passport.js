const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const  prisma  = require("../lib/prisma.js");
const path = require('path');
const fs = require('fs');
const passport = require('passport');



const PUB_KEY = fs.readFileSync(
  path.join(__dirname, '..', 'id_rsa_pub.pem'),
  'utf8'
);
// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};
const strategy = (new JwtStrategy(options, async function(jwt_payload, done) {
        
       try {
               

                 // Prisma version of finding the user
                 const user = await prisma.user.findUnique({
                       where: {
                                 id: jwt_payload.sub   // or whatever your primary key is called
                            }
                    });

                if (user) {
                        return done(null, user);
                } else {
                 return done(null, false);
             }

  } catch (err) {
    return done(err, false);
  }
        
    }))
passport.use(strategy)