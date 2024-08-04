import { sequelize } from "./_db.js";
import { User } from "./User.js";
import { Contact } from "./Contact.js";

async function connectDB() {
  try {
    await sequelize.authenticate();

    await User.sync();
    await Contact.sync();

    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

export { connectDB };
