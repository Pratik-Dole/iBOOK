const jwt = require('jsonwebtoken');

// Create A JWT_SECRET Token ::
const JWT_SECRET = "ILoveItWhenYouCallMeSenorita";

const fetchDetails = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "invalid token !!"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
    
        next();
    } 
    catch (error) {
        res.status(401).send({error: "invalid token !!"});
    }
}

module.exports = fetchDetails;