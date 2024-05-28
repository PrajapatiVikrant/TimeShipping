const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const jwtVerifyMiddleware = (req, res, next) => {
    // Extract token from request header, query parameter, or cookie
   
    const token = req.query.token;
   
  
   
    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'shippingSystem'); // Assuming you have JWT_SECRET stored in environment variable
       
        req.body = decoded; // Attach decoded user information to request object for further use
      
        next(); // Call next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = jwtVerifyMiddleware;