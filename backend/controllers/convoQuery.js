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

async function fetchsingleConvo(req, res, next){
     const user = req.user
    const {id} = req.params
    const new_id = Number(id)
    try{
        const singleConvo = await db.singleConvo(new_id)
        const otherUser = singleConvo.members.find(
                      (member) => member.userId !== user.id
                );
       res.json({
                 success: true,
                singleConvo,
                otherUser: otherUser?.user ?? null
            });
    }
    catch(error){
        console.log("error", error)
        next(error)
    }
}
module.exports = {
    fetchallConvo,
    convo,
    fetchsingleConvo
}