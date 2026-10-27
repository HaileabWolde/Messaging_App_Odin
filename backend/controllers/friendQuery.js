const db = require("../db/friendDB")

async function sendFriendRequest(req, res, next){
     const {id} = req.user
     const {userId} = req.params
    const senderId = id
    const reciverId = Number(userId)

   
     try{
        const frdRequest = await db.sendRequest(senderId, reciverId)
        res.json({
            success: "true",
            frdRequest: frdRequest
        })
     }
     catch(error){
        console.log("error", error.response)
        next(error)
     }
}

async function allsentRequest(req, res, next) {
    const {id} = req.user
    try{
        const allsentRequest = await db.getSentRequests(id)
        res.json({
            success: "true",
            allsentRequest
        })
    }
    catch(error){
        console.log("error", error.response)
        next(error)
    }
    
}

async function allrecivedRequest(req, res, next){
    const {id} = req.user

    try{
        const allrecivedRequest = await db.getReceivedRequests(id)
        res.json({
            success: "true",
            allrecivedRequest: allrecivedRequest
        })
    }
    catch(error){
        console.log("error", error.response)
        next(error)
    }
}

async function acceptFriendRequest(req, res, next){
    const {id} = req.user
     const {userId} = req.params
    const receiverId = id
    const senderId = Number(userId)
    try{
        await db.acceptFriendRequest(receiverId, senderId)
        res.json({
            success: "true"
        })
    }
    catch(error){
        console.error("Accept friend request failed:", error);
    next(error);

    }

}

async function rejectFriendRequest(req, res, next){
      const {id} = req.user
     const {userId} = req.params
    const receiverId = id
    const senderId = Number(userId)

    try{
        await db.rejectFriendRequest(senderId, receiverId)

        res.json({
            success: "true"
        })
    }
    catch(error){
         console.error("Accept friend request failed:", error);
    next(error);
    }
}

module.exports = {
    sendFriendRequest,
    allsentRequest,
    allrecivedRequest,
    acceptFriendRequest,
    rejectFriendRequest
}