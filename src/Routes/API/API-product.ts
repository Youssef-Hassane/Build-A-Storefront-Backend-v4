import theExpressModule from 'express';
import theProductHandler from '../../Handler-Folder/productHandler';
import AUTH from '../../Middleware/auth';

// Initialize Express/Router in order to be utilized in the src/api/index.ts file
const routes: theExpressModule.Router = theExpressModule.Router();

routes.post('/add', AUTH, theProductHandler.CREATE_PRODUCT);
routes.get('/show-All-Product', theProductHandler.SHOW_ALL_PRODUCT);
routes.get(
    '/show-Product/:ID',
    theProductHandler.SHOW_SPECIFIC_PRODUCT_BY_ID
);
routes.patch('/update/:ID', AUTH, theProductHandler.UPDATE_SPECIFIC_PRODUCT_ID);
routes.delete(
    '/delete/:ID',
    AUTH,
    theProductHandler.DELETE_SPECIFIC_PRODUCT_BY_ID
);

export default routes;


// The reviewer said :
//      JWT is used judiciously in the application to secure routes but product GET routes must not have authentication.
//      Another level of security in real-time is authentication of user.
//      This is used to check if the user authentication request is coming from a credible source and jsonwebtoken helps us verify that by generating a unique token every time.

//      Product GET routes (both) must not have authentication.
//      All the users, logged-in or not, should be able to view products.

// My Old Code:

//      routes.get('/show-All-Product', AUTH, theProductHandler.SHOW_ALL_PRODUCT);
//      routes.get(
//          '/show-Product/:ID',
//          AUTH,
//          theProductHandler.SHOW_SPECIFIC_PRODUCT_BY_ID
//      );

// My New Code:
//       routes.get('/show-All-Product', theProductHandler.SHOW_ALL_PRODUCT);
//       routes.get(
//           '/show-Product/:ID',
//           theProductHandler.SHOW_SPECIFIC_PRODUCT_BY_ID
//       );