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
module.exports = {
    fetchallConvo
}