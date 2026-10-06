const {Router}  = require("express");
const indexRouter = Router();

indexRouter.get('/', (req, res)=>{
    res.send("fuck u bitch")
})
module.exports = indexRouter;