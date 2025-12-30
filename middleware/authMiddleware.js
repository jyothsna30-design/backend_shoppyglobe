import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Expecting header format: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
   //getting jwt token and verifying
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey");

    // Attach user ID to request object
    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
