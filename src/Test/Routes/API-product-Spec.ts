import theAssist from './Assist/API-product-assist';

describe(
    'Test the *product* API EndPoint of server that is in the "src/Routes/API/API-users" file:',
    callbackFunction
);

function callbackFunction() {
    beforeAll(theAssist.beforeTesting);
    it(
        'Testing the authorization function (getting the token) ',
        theAssist.getToken
    );
    it(
        'Testing the the create product route "http://localhost:2011/api/product/add',
        theAssist.theCreateProductRoute
    );
    it(
        'Testing the the show all product route "http://localhost:2011/api/product/show-All-Product',
        theAssist.theShowAllProductRoute
    );
    it(
        'Testing the the show specific product by id route "http://localhost:2011/api/show-Product/1',
        theAssist.theShowProductByIdRoute
    );
    it(
        'Testing the the update specific product by id route "http://localhost:2011/api/product/update/1',
        theAssist.theUpdateProductRoute
    );
    it(
        'Testing the the delete specific product by id route "http://localhost:2011/api/product/delete/1',
        theAssist.theDeleteProductByIdRoute
    );
    afterAll(theAssist.afterTesting);
}
