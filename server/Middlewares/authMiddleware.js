import jwt from 'jsonwebtoken';

// to ensure only logged-in users can access tasks , we will create an authentication middleware, which  will be used in our get , update and delete routes
const authMiddleware = (req, res, next) => {
    
    // by convention , client sends the token in the Authorization header, that's what we are accessing 
    const token = req.header("Authorization");

    console.log(token)

    if (!token) {
        res.status(400).json({ msg: "access denied" })
    }

    try {
        // you need your jwt-security-password to create and verify your jsonwebtoken
        // tokens need to be verified in case the token has been tampered with , misused or expired
        // jwt validation checks the structure, claims, and signature to ensure the least amount of risk 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded)

        if(decoded){
            //refer to this and look at serial number 4  https://www.notion.so/random-notes-1bd4197e5f78802a89a5c65164e1f90f?pvs=4
            // attaches the decoded user-data(userId,iat(time of creation of the token), exp(and the time of it's expiration))to the req object,decoded = {userId:ID,iat:time_of_creation_of_the_token,exp},which also consists of request headers, request-body, query-params, request-params
            req.user = decoded; //attach user data to request
        }

        next();

    }catch (err) {
        res.status(500).json({ msg: "Invalid Token" ,err})
        console.error(err)
    }
   
}

export default authMiddleware;