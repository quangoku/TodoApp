import jwt from "jsonwebtoken";

export function authentication(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err.name);
      return res.sendStatus(403);
    }
    req.user = user;
    console.log(user);
    next();
  });
}
