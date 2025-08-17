import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "../src/app.js";


dotenv.config({path:'./.env'})
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB error", error);
    process.exit(1);
  });
