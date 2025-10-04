import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Not authorized, token missing" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res
                .status(401)
                .json({ message: "Not authorized, please login first" });
        }
        if (!roles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ message: `User role '${req.user.role}' not authorized` });
        }
        next();
    };
};
