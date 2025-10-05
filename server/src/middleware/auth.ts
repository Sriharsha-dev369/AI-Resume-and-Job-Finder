import jwt from "jsonwebtoken";

export async function Authourization(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "no token provided" });

  try {
    const decoded = jwt.verify(token, "SECRET");
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

