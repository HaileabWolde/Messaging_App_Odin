const db = require("../db/convoDB")

async function fetchallConvo(req, res, next){
    const user = req.user
    const {id} = user
    try{
        const allConvo = await db.findallconvo(id)
        res.json({
            allconvo: allConvo
        })
    }
    catch(error){
        console.group("error", error)
        next(error)
    }
}

async function convo(req, res, next){
     const{id} = req.user
    const {userId} = req.body
 
    try{
        const convo = await db.newconvo(userId, id)
        res.json({
            sucesss: true,
            convo: convo
        })
    }
    catch(error){
        console.log("error", error)
        next(error)
    }
}
module.exports = {
    fetchallConvo,
    convo
}