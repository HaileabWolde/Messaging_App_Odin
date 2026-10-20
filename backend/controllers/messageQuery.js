const db = require("../db/messageDB")
async function addMessaging(req, res, next){
    const loggedUser = req.user
    const {message} = req.body
   let path = ''
    const {id} = req.params
    if(!req.file){
        path = null
    }
    else {
        const {path} = req.file
        path = path
    }
     
    try{
       const response = await db.addMessages(loggedUser, id, message, path)
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