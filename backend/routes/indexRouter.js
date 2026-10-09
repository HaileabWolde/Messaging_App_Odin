const {Router}  = require("express");
const {signUser, loginUser} = require("../controllers/userQuery")

const indexRouter = Router();

indexRouter.post('/signup',  signUser)
indexRouter.post('/login', loginUser)

module.exports = indexRouter;