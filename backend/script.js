const prisma = require('./lib/prisma');

async function main() {
  
 /* const user = await prisma.user.create({
    data: {
      username: "woma",
      password: "1428",
    },
  });
  console.log("Created user:", user);*/
 // await prisma.user.deleteMany()
 /*await prisma.conversation.create({
  data: {
     members: {
      create: [
        {
          user: {
            connect: {
              id: 9
            }
          }
        },
        {
          user: {
            connect: {
              id: 8
            }
          }
        }
      ]
     }
  }
 })*/
await prisma.friendRequest.deleteMany()
/*await prisma.message.deleteMany()
await prisma.userConversation.deleteMany()
await prisma.conversation.deleteMany()
/*
await prisma.userConversation.deleteMany()
await prisma.conversation.deleteMany()
/*const allconversations = await prisma.conversation.findMany({
   where: {
    members: {
      some: {
        userId: 7
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
  console.log(allconversations)*/
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });