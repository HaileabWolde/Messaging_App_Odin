const passport = require("passport");
const {Router}  = require("express");




const {signUser, loginUser, validateUser, FetchUser} = require("../controllers/userQuery")
const {fetchallConvo, convo, fetchsingleConvo} = require("../controllers/convoQuery")
const {addMessaging} = require("../controllers/messageQuery")
const {handleImageUpload} = require("../image/imageUpload")
const indexRouter = Router();
//user
indexRouter.post('/signup',  validateUser, signUser)
indexRouter.post('/login', loginUser)
indexRouter.get('/allusers', passport.authenticate('jwt', { session: false }), FetchUser)


//convo
indexRouter.get('/conversations', passport.authenticate('jwt', { session: false }), fetchallConvo)
indexRouter.get('/conversations/:id', passport.authenticate('jwt', {session: false}), fetchsingleConvo)
indexRouter.post('/conversations/:id', passport.authenticate('jwt', {session: false}), handleImageUpload, addMessaging)
indexRouter.post('/conversations', passport.authenticate('jwt', {session: false}),  convo)
module.exports = indexRouter;