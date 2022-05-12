import getHash from '../utils/getHash.mjs';

export default function initUserController(db) {
  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await db.User.findOne({ where: { username } });

      if (!user) {
        res.status(401).send('Wrong username or password');
        return;
      }

      if (user.password !== getHash(password)) {
        res.status(401).send('Wrong username or password');
        return;
      }

      res.cookie('loggedInHash', getHash(`${user.id}-${process.env.SALT}`));
      res.cookie('userId', user.id);
      res.send({ login: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const signup = async (req, res) => {
    try {
      const {
        username, password, displayName, accountType,
      } = req.body;
      const hashedPassword = getHash(password);
      await db.User.create({
        username, password: hashedPassword, displayName, accountType,
      });
      res.send({ signup: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    login, signup,
  };
}
