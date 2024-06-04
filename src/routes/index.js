import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import notesRoute from './notes.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {

  //  for userCreation, login and token
  router.use('/users', userRoute);
  
  // for notes creation, archive and trash
  router.use('/notes', notesRoute);

  return router;
};

export default routes;