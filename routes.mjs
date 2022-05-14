import { resolve } from 'path';
import db from './models/index.mjs';

import checkAuth from './middleware/checkAuth.mjs';

import initUserController from './controllers/users.mjs';
import initContractController from './controllers/contracts.mjs';
import initLessonController from './controllers/lessons.mjs';
import initCommentController from './controllers/comments.mjs';

export default function routes(app) {
  const UserController = initUserController(db);
  const ContractController = initContractController(db);
  const LessonController = initLessonController(db);
  const CommentController = initCommentController(db);

  app.post('/login', UserController.login);
  app.delete('/logout', (_, res) => {
    res.clearCookie('userId');
    res.clearCookie('loggedInHash');
    res.send({});
  });
  app.post('/signup', UserController.signup);
  app.get('/signup/check-username', UserController.checkUsername);

  app.get('/students', ContractController.getStudents);
  app.get('/students/active', ContractController.getActiveStudents);

  app.get('/lessons', LessonController.getLessons);
  app.post('/lessons', LessonController.postLesson);
  app.put('/lesson/:id', LessonController.updateLesson);
  app.delete('/lesson/:id', LessonController.deleteLesson);

  app.get('/lesson/:id/comments', CommentController.getComments);

  app.get('/checkAuth', checkAuth);

  // Root route renders Webpack-generated main.html file
  app.get('/', (_, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });
}
