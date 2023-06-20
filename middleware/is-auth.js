export const isAuth = async (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.status(400).json('not authorised')
    return;

  }
  await next();
};
