// middleware/requireAuth.js
import jwt from "jsonwebtoken";

export default function requireAuth(req, res, next) {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) return res.status(401).json({ message: "Missing token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
