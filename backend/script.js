const prisma = require('./lib/prisma');

async function main() {
  
 /* const user = await prisma.user.create({
    data: {
      username: "woma",
      password: "1428",
    },
  });
  console.log("Created user:", user);*/
  await prisma.user.deleteMany()
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