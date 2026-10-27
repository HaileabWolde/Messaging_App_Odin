const passport = require("passport");
const {Router}  = require("express");
const {handleImageUpload} = require("../image/imageUpload")



const {sendFriendRequest, allsentRequest, 
    allrecivedRequest, acceptFriendRequest, rejectFriendRequest}  = require("../controllers/friendQuery")
const {signUser, loginUser, validateUser, FetchUser} = require("../controllers/userQuery")
const {fetchallConvo, convo, fetchsingleConvo} = require("../controllers/convoQuery")
const {addMessaging} = require("../controllers/messageQuery")

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



///friendRequest
indexRouter.get('/allfriend-request-sent', passport.authenticate('jwt', {session: false}), allsentRequest)
indexRouter.get('/allfriend-request-received', passport.authenticate('jwt', {session: false}), allrecivedRequest)
indexRouter.post('/friend-requests/:userId', passport.authenticate('jwt', {session: false}), sendFriendRequest)
indexRouter.patch('/acceptfriendrequest/:userId',  passport.authenticate('jwt', {session: false}), acceptFriendRequest)
indexRouter.patch('/rejectfriendrequest/:userId',  passport.authenticate('jwt', {session: false}), rejectFriendRequest)
module.exports = indexRouter;