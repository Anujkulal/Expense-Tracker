const { Schema, model } = require('mongoose');
const { createTokenForUser } = require('../services/auth');

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "image/default.png",
    },
}, { timestamps: true });

// UserSchema.pre("save", function(next){
//     const user = this;
//     if(!user.isModified("password")) return next();

//     const salt = randomBytes(16).toString();
//     const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")

//     this.salt = salt;
//     this.password = hashedPassword;
//     return next();
// })

UserSchema.static("matchPasswordAndGenerateToken", async function(email, password){
    const user = await this.findOne({ email });
    if(!user) throw new Error("User not found");

    if(password !== user.password) throw new Error("Password not matched");

    const token = createTokenForUser(user);
    return token;
})

const User = model('User', UserSchema);

module.exports = User;