const  prisma  = require("../lib/prisma.js");
async function findallconvo(userid){
   const allconversations = await prisma.conversation.findMany({
   where: {
    members: {
      some: {
        userId: userid
      }
    }
  },
  include: {
    members: {
      include: {
        user: {
          select: {
            id: true,
            username: true,
         
          }
        }
      }
    }
  }
})
 return allconversations
}


module.exports = {
    findallconvo
}