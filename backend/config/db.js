import mongoose from "mongoose";
export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to mongodb : ${conn.connection.host} ${conn.connection.port}`
    );
  } catch (e) {
    console.error(`Error : ${e}`);
    process.exit(1);
  }
}
