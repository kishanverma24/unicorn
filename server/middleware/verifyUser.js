import jwt from "jsonwebtoken";
export const verifyUser = (req, res, next) => {
  //   console.log(req.cookies.token);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Invalid Admin", status: false });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", status: false });
    }
    // console.log(decoded._id);
    req.userid = decoded._id;
    next();
  });
};
