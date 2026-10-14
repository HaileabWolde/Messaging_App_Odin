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

async function newconvo(userid, newid){
  const convo = await prisma.userConversation.findMany({
    where: {
      userId: newid
    }
  })
 
  if(convo.length === 0){
  const newconvo =  await prisma.conversation.create({
      data: {
        members: {
          create: [
            {
              user: {
              connect: {
                id: newid
              }
              }
            },
            {
              user: {
                connect: {
                  id: userid
                }
              }
            }
          ]
        }
      }
      
    })
    return newconvo;
  }
  else {
    const exisitingconvo = await prisma.conversation.findMany({
      where: {
           isGroup: false,

            AND: [
           {
               members: {
                       some: {
                      userId: userid
                      }
                }
         },
       {
               members: {
              some: {
              userId: newid
             }
            }
       }
        ]
      }
    })
   return exisitingconvo
  }

}
module.exports = {
    findallconvo,
    newconvo
}