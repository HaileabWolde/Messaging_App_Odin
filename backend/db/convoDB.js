const  prisma  = require("../lib/prisma.js");

async function findallconvo(userid) {
  const allconversations = await prisma.conversation.findMany({
    where: {
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
    messages:true
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
    
        orderBy: {
          createdAt: "desc",
        },
      },
    }
  });
}
module.exports = {
    findallconvo,
    newconvo,
    singleConvo,
    GroupConvo
}