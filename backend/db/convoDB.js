const  prisma  = require("../lib/prisma.js");

async function findallconvo(userid) {
  const allconversations = await prisma.conversation.findMany({
    where: {
      isGroup: false,
      members: {
        some: {
          userId: userid,
        },
      },
    },
   
    include: {
      members: {
        where: {
          userId: {
            not: userid,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return allconversations;
}


async function newconvo(userid, newid) {
  const existingConvo = await prisma.conversation.findFirst({
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
  });
 

  if (existingConvo) {
    return existingConvo;
  }

  const newConvo = await prisma.conversation.create({
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
  });

  return newConvo;
}

async function singleConvo(id){
  const singleConvo = await prisma.conversation.findUnique({
    where: {
    id: id
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
    },
    messages:{
    
      include:{
        sender: {
          select: {
            id: true,
            username: true,
         
          }
        }
      } 
      }
  }
  })
  return singleConvo
}

async function GroupConvo(memberIds, groupName) {
  return await prisma.conversation.create({
    data: {
      isGroup: true,
      name: groupName,
      members: {
        create: memberIds.map((userId) => ({
          user: {
            connect: {
              id: userId
            }
          }
        }))
      }
    },
    include: {
      members: {
        include: {
          user: true
        }
      },
       messages: {
           take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    }
  });
}

async function fetchGroupConvo(userid){
  return await prisma.conversation.findMany({
    where: {
      isGroup: true,
        members: {
        some: {
          userId: userid,
        },
      }
    
  },
   include: {
       messages: {
           take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    }
})
}
module.exports = {
    findallconvo,
    newconvo,
    singleConvo,
    GroupConvo,
    fetchGroupConvo
}