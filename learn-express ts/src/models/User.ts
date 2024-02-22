import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
// import passportLocalMongoose from "passport-local-mongoose";
export interface IUserDocument extends Document {
  email: string;
  password: string;
  isValidPassword(password: string): Promise<boolean>;
}
const UserSchema = new Schema<IUserDocument>({
  email: { type: String, require: true, unique: true },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

// UserSchema.plugin(passportLocalMongoose);
const User = model("user", UserSchema);

export default User;
