import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1] || undefined;
  if(!token){
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    next(error);
    return;
  }
  let decodedToken = jwt.verify(token, "secret");
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    next(error);
    return;
  }
  req.userId = decodedToken.userId;
  next();
};
