const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const { genSalt, hash, compare } = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Minimum password length is 6 characters"],
  },
  name: {
    type: String,
    required: false,
    maxLength: 30,
  },
  surname: {
    type: String,
    required: false,
    maxLength: 50,
  },
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  weight: {
    type: Number,
    required: false,
  },
  profilePhoto: {
    type: String, // Path to the profile photo on the server
    required: false,
  },
});

// HOOKS:

// (mongoose middleware)
// https://mongoosejs.com/docs/middleware.html

// function(){} - has access to "this", an instance of user
// () => {} - arrow function does not have access to "this"
//

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("New user was created and saved.", doc);
  next();
});

/**
 * Static method to login user:
 * Find user in db
 * If user is found:
 *  * compare unhashed password with hashed password stored in db
 *  * if passwords match return user
 * Throw Error otherwise
 *
 * @param {String} email
 * @param {String} password
 * @returns User
 */

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect email or password");
  }
  throw Error("Incorrect email or password");
};

const User = model("User", userSchema);
module.exports = User;
