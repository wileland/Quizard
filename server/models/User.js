import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

class UserClass {
  constructor({ email, password, userName, firstName, lastName }) {
    if (new.target === UserClass) {
      throw new Error("Cannot directly call class !!");
    }
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  welcomeUser() {
    console.log(`Welcome ${this.userName}`);
  }
}

const hashNum = 15;

function createUserSchema() {
  return new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  });
}

const userSchema = createUserSchema();

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(hashNum);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = model("User", userSchema);

export default User;
