const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).json({msg:'Invalid Token - Access Denied'});

    try
    {
        const verifiedToken = jwt.verify(token, config.get('jwtToken'));

        req.loggedUser = verifiedToken.loggedUser;
        next();
    }
    catch(error)
    {
        res.status(401).json({msg:'Invalid Token - Access Denied '});
    }
}

