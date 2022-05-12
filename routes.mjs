import { resolve } from 'path';
import db from './models/index.mjs';

import initUserController from './controllers/users.mjs';

export default function routes(app) {
  const UserController = initUserController(db);

  app.post('/login', UserController.login);

  // Root route renders Webpack-generated main.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
