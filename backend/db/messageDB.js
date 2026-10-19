const  prisma  = require("../lib/prisma.js");

async function addMessages(loggedUser, id, message){
    const new_id = Number(id)
    const newmessage = await prisma.message.create({
        data: {
            senderId: loggedUser.id,
            content: message,
            conversationId: new_id
        }
    })
    return newmessage;
}

module.exports = {
    addMessages
}