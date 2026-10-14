const passport = require("passport");
const {Router}  = require("express");
const {signUser, loginUser, validateUser, FetchUser} = require("../controllers/userQuery")
const {fetchallConvo, convo} = require("../controllers/convoQuery")

const indexRouter = Router();
//user
indexRouter.post('/signup',  validateUser, signUser)
indexRouter.post('/login', loginUser)
indexRouter.get('/allusers', passport.authenticate('jwt', { session: false }), FetchUser)


//convo
indexRouter.get('/conversations', passport.authenticate('jwt', { session: false }), fetchallConvo)
indexRouter.post('/conversations', passport.authenticate('jwt', {session: false}),  convo)
module.exports = indexRouter;