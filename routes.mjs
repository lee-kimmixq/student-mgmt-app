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

  app.post('/api/login', UserController.login);
  app.delete('/api/logout', (_, res) => {
    res.clearCookie('userId');
    res.clearCookie('loggedInHash');
    res.send({});
  });
  app.post('/api/signup', UserController.signup);
  app.get('/api/signup/check-username', UserController.checkUsername);

  app.get('/api/students', ContractController.getStudents);
  app.get('/api/students/active', ContractController.getActiveStudents);

  app.get('/api/lessons', LessonController.getLessons);
  app.post('/api/lessons', LessonController.postLesson);
  app.put('/api/lesson/:id', LessonController.updateLesson);
  app.delete('/api/lesson/:id', LessonController.deleteLesson);

  app.get('/api/lesson/:id/comments', CommentController.getComments);
  app.post('/api/lesson/:id/comments', CommentController.postComment);
  app.delete('/api/lesson/:id/comments', CommentController.deleteComments);

  app.get('/api/checkAuth', checkAuth);

  // Root route renders Webpack-generated main.html file
  app.get('/', (_, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });
}
