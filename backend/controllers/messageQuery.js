
const db = require("../db/messageDB");

async function addMessaging(req, res, next) {
  const loggedUser = req.user;
  const { message } = req.body;
  const { id } = req.params;
  const path = req.file?.path ?? null;

  try {
    const response = await db.addMessages(
      loggedUser,
      id,
      message,
      path
    );

    res.status(201).json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  addMessaging,
};
