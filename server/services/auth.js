const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

function createTokenForUser(user){
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
    }

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    return token;
}

function verifyUserToken(token){
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    verifyUserToken,
}