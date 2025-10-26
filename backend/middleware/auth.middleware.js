import jwt from 'jsonwebtoken'

async function authenticatingToken(req, res, next) {
    try {
        const gettingToken = req.headers.authorization;
        // console.log("Authorization Header:", gettingToken || "No Authorization header found");
        
        if (!gettingToken || !gettingToken.startsWith("Bearer ")) {
            return res.status(401).json({ message: "You don't have valid access" });
        }

        const token = gettingToken.split(" ")[1];
        // console.log("Extracted Token:", token || "No token found after Bearer");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log("Authenticated user ID:", req.user._id   || "No user ID found in token");
        
        next();
        
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

export { authenticatingToken }