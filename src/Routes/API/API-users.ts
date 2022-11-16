import theExpressModule from 'express';
import theUserHandler from '../../Handler-Folder/userHandler';
import AUTH from '../../Middleware/auth';

// Initialize Express/Router in order to be utilized in the src/api/index.ts file
const routes: theExpressModule.Router = theExpressModule.Router();

routes.post('/add', theUserHandler.CREATE_USER);
routes.get('/show-all-user', AUTH, theUserHandler.SHOW_ALL_USER);
routes.get('/show-user/:ID', AUTH, theUserHandler.SHOW_SPECIFIC_USER_BY_ID);
routes.patch('/update/:ID', AUTH, theUserHandler.UPDATE_SPECIFIC_USER_ID);
routes.delete('/delete/:ID', AUTH, theUserHandler.DELETE_SPECIFIC_USER_BY_ID);
routes.post('/auth', theUserHandler.AUTH);

export default routes;
