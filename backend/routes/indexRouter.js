const passport = require("passport");
const {Router}  = require("express");
const {signUser, loginUser, validateUser} = require("../controllers/userQuery")
const {fetchallConvo} = require("../controllers/convoQuery")

const indexRouter = Router();
//user
indexRouter.post('/signup',  validateUser, signUser)
indexRouter.post('/login', loginUser)


//convo
indexRouter.get('/conversations', passport.authenticate('jwt', { session: false }), fetchallConvo)
module.exports = indexRouter;