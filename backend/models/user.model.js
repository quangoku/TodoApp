import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: String,
    password: String,
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/dy2ihfctd/image/upload/v1756202531/soicodoc_tv5sha.png",
    },
  },
  {
    //ko them version key (version key is needed for multiple update tho)
    versionKey: false,
  }
);
//mongoose will automatically turn model name into plural and lowercase User -> users
const User = mongoose.model("User", userSchema);
export default User;
