const db = require("../db/messageDB")
async function addMessaging(req, res, next){
    const loggedUser = req.user
    const {message} = req.body
   
    const {id} = req.params
    try{
       const response = await db.addMessages(loggedUser, id, message)
       res.json({
        succces: true,
        response: response
       })
    }
    catch(error){
        console.log(error)
        next(error)
    }
}
module.exports = {
    addMessaging
}