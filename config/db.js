// Config DataBase;
const db = require("mongoose");
const Connectdb = async function () {
  try {
   await db.connect(process.env.MONGO_URL)
   console.log("server connect ");
  } 
  catch (error)
  {
    console.error(error.message);
  process.exit(1);
  }
};

module.exports = Connectdb;
