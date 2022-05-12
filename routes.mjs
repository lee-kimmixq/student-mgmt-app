import { resolve } from 'path';
import db from './models/index.mjs';

import initUserController from './controllers/users.mjs';

export default function routes(app) {
  const UserController = initUserController(db);

  app.post('/login', UserController.login);
  app.delete('/logout', (_, res) => {
    res.clearCookie('userId');
    res.clearCookie('loggedInHash');
    res.send({});
  });

  // Root route renders Webpack-generated main.html file
  app.get('/', (_, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });
}
