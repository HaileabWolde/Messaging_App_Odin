const bcrypt = require("bcryptjs");
const  prisma  = require("../lib/prisma.js");



async function createUser(username, password){
     const hashedPassword = await bcrypt.hash(password,  10);
     const user = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
        }
     })
     return user
}

async function findUser(username){

 const user = await prisma.user.findUnique({
            where: {
                username: username
            }
})
 return user
}

async function getUserProfile(id){
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}

async function fetchallUser() {
  const alluser = await prisma.user.findMany({
    include: {
      receivedFriendRequests: {
        where: {
          status: "ACCEPTED",
        },
      },
      sentFriendRequests: {
        where: {
          status: "ACCEPTED",
        },
      },
    },
  });

  return alluser;
}

async function editUserProfile(id, bio){
  return await prisma.user.update({
    where: {
      id: id
    },
    data: {
      bio: bio 
    }
  })
}
module.exports = {
    createUser,
    findUser,
    fetchallUser,
    editUserProfile,
    getUserProfile
}