const {Router}  = require("express");
const {signUser, loginUser, validateUser} = require("../controllers/userQuery")

const indexRouter = Router();

indexRouter.post('/signup',  validateUser, signUser)
indexRouter.post('/login', loginUser)

module.exports = indexRouter;