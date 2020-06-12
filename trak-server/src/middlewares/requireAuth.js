const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = ( req, res, next ) => {
    const { authorization } = req.headers;
    // authorization = `Bearer kdjldjljdslfjldsfjlfjlsdjflk`

    if(!authorization){
        return res.status(401).send({ error : 'You must be logged in...'});
    }

    const token = authorization.replace("Bearer ", ""); //taking only token string

    jwt.verify(token, "My Secret Key", async (err, payload) => {
        if(err){
            return res.status(401).send({ error : 'You must be logged in...'});  //return in err means futher code will not be executed
        }
        const { userId } = payload; //payload here means value that has been encoded previously
        const user = await User.findById(userId);  //finding user using userId in mango db so it is async fucntion
        req.user = user;  //sending the found user along with the req
        next();
    });
}