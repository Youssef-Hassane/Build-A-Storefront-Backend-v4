import theExpressModule from 'express';
import theOrderHandler from '../../Handler-Folder/orderHandler';
import AUTH from '../../Middleware/auth';

// Initialize Express/Router in order to be utilized in the src/api/index.ts file
const routes: theExpressModule.Router = theExpressModule.Router();

routes.post('/add', AUTH, theOrderHandler.CREATE_ORDER);
routes.get('/show-all-order', AUTH, theOrderHandler.SHOW_ALL_ORDER);
routes.get('/show-order/:ID', AUTH, theOrderHandler.SHOW_SPECIFIC_ORDER_BY_ID);
routes.patch('/update/:ID', AUTH, theOrderHandler.UPDATE_SPECIFIC_ORDER_ID);
routes.delete('/delete/:ID', AUTH, theOrderHandler.DELETE_SPECIFIC_ORDER_BY_ID);
routes.post(
    '/insert/:ID',
    AUTH,
    theOrderHandler.INSERT_THE_PRODUCT_INTO_THE_USER_ORDER_TABLE
);

export default routes;
