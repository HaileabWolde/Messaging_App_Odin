
const prisma = require("../lib/prisma");

async function sendRequest(senderId, receiverId) {
  if (senderId === receiverId) {
    throw new Error("You cannot send a friend request to yourself.");
  }

  const receiver = await prisma.user.findUnique({
    where: { id: receiverId },
  });

  if (!receiver) {
    throw new Error("User not found.");
  }

  // Check both directions to prevent duplicate requests.
  const existing = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  if (existing) {
    throw new Error("A friend request already exists.");
  }

  return prisma.friendRequest.create({
    data: {
      senderId,
      receiverId,
    },
  });
}



async function getSentRequests(userId) {
  return prisma.friendRequest.findMany({
    where: {
      senderId: userId,
      status: "PENDING",
    },
    include: {
      receiver: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getReceivedRequests(userId) {
  return prisma.friendRequest.findMany({
    where: {
      receiverId: userId,
      status: "PENDING",
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

module.exports = { 
    sendRequest,
    getSentRequests,
    getReceivedRequests
   };
