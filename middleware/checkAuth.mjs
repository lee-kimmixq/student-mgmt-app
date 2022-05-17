import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // TODO: error pages

    req.user = user;
    next();
  });
};

export default checkAuth;
