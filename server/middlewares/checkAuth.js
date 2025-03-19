const { verifyUserToken } = require("../services/auth");

function checkAuth(cookieName){
    return (req, res, next) => {
        const token = req.cookies[cookieName];
        if(!token) return next();

        try{
            const payload = verifyUserToken(token);
            if(!payload) return next();

            req.user = payload;
            next();
        } catch(error){
            res.status(401).json({ message: "Unauthorized" });
            return next();
        }
    }
}

module.exports = {
    checkAuth
};