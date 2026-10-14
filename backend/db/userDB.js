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

async function fetchallUser(){
    const alluser = await prisma.user.findMany()

    return alluser
}
module.exports = {
    createUser,
    findUser,
    fetchallUser
}