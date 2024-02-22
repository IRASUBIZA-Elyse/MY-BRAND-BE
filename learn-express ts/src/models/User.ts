// import mongoose, { Schema, model, Document } from "mongoose";
// import bcrypt from "bcrypt";
// // import passportLocalMongoose from "passport-local-mongoose";
// export interface IUserDocument extends Document {
//   userName: String;
//   email: string;
//   password: string;
//   isValidPassword(password: string): Promise<boolean>;
// }
// const UserSchema = new Schema<IUserDocument>({
//   userName: { type: "string", required: true },
//   email: { type: String, require: true, unique: true },
//   password: {
//     type: String,
//     required: true,
//   },
// });
// UserSchema.pre("save", async function (next) {
//   const user = this;
//   const hash = await bcrypt.hash(user.password, 10);

//   this.password = hash;
//   next();
// });

// UserSchema.methods.isValidPassword = async function (
//   password: string
// ): Promise<boolean> {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);

//   return compare;
// };

// // UserSchema.plugin(passportLocalMongoose);
// const User = model("user", UserSchema);

// export default User;
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

export default mongoose.model<IUser>("User", userSchema);
