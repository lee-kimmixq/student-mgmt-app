import getHash from '../utils/getHash.mjs';

const checkAuth = (req, res) => {
  if (!req.cookies.loggedInHash || !req.cookies.userId) {
    res.send({ login: false });
    return;
  }

  const { loggedInHash, userId } = req.cookies;
  const hashedCookie = getHash(`${userId}-${process.env.SALT}`);

  if (hashedCookie !== loggedInHash) {
    res.send({ login: false });
    return;
  }

  res.send({ login: true });
};

export default checkAuth;
