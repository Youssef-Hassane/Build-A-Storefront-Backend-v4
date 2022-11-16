import theAssist from './Assist/API-order-assist';

describe(
    'Test the *order* API EndPoint of server that is in the "src/Routes/API/API-users" file:',
    callbackFunction
);

function callbackFunction() {
    beforeAll(theAssist.beforeTesting);
    it(
        'Testing the authorization function (getting the token) ',
        theAssist.getToken
    );
    it(
        'Testing the the create order route "http://localhost:2011/api/order/add',
        theAssist.theCreateOrderRoute
    );
    it(
        'Testing the the show all order route "http://localhost:2011/api/order/show-All-order',
        theAssist.theShowAllOrderRoute
    );
    it(
        'Testing the the show specific order by id route "http://localhost:2011/api/show-order/1',
        theAssist.theShowOrderByIdRoute
    );
    it(
        'Testing the the update specific order by id route "http://localhost:2011/api/order/update/1',
        theAssist.theUpdateOrderRoute
    );
    it(
        'Testing the the delete specific order by id route "http://localhost:2011/api/order/delete/1',
        theAssist.theDeleteOrderByIdRoute
    );
    afterAll(theAssist.afterTesting);
}
