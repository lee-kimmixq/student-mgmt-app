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
    res.clearCookie('loginToken');
    res.send({});
  });
  app.post('/api/signup', UserController.signup);
  app.get('/api/signup/check-username', UserController.checkUsername);
  app.get('/api/teacher', checkAuth, UserController.findTeacher);
  app.get('/api/getAuth', checkAuth, UserController.getAuth);

  app.get('/api/students', checkAuth, ContractController.getStudents);
  app.post('/api/students', checkAuth, ContractController.postRequest);
  app.get('/api/students/active', checkAuth, ContractController.getActiveStudents);
  app.post('/api/student/:id', checkAuth, ContractController.changeStudentStatus);

  app.get('/api/lessons', checkAuth, LessonController.getLessons);
  app.post('/api/lessons', checkAuth, LessonController.postLesson);
  app.put('/api/lesson/:id', checkAuth, LessonController.updateLesson);
  app.delete('/api/lesson/:id', checkAuth, LessonController.deleteLesson);

  app.get('/api/lesson/:id/comments', checkAuth, CommentController.getComments);
  app.post('/api/lesson/:id/comments', checkAuth, CommentController.postComment);
  app.delete('/api/lesson/:id/comments', checkAuth, CommentController.deleteComments);

  // Root route renders Webpack-generated main.html file
  app.get('/*', (_, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });
}
