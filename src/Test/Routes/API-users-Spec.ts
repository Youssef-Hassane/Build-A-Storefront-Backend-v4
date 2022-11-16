import theAssist from './Assist/API-users-assist';

describe(
    'Test the *user* API EndPoint of server that is in the "src/Routes/API/API-users" file:',
    callbackFunction
);

function callbackFunction() {
    beforeAll(theAssist.beforeTesting);
    afterAll(theAssist.afterTesting);

    it('Testing the authorization function ', theAssist.getToken);
    it(
        'Testing the authorization function with wrong information',
        theAssist.getTokenWrongInformation
    );
    it(
        'Testing the the create user route "http://localhost:2011/api/user/add',
        theAssist.theCreateUserRoute
    );
    it(
        'Testing the the show all user route "http://localhost:2011/api/user/show-all-user',
        theAssist.theShowAllUserRoute
    );
    it(
        'Testing the the show specific user by id route "http://localhost:2011/api/user/show-user/1',
        theAssist.theShowUserByIdRoute
    );
    it(
        'Testing the the update specific user by id route "http://localhost:2011/api/user/update/2',
        theAssist.theUpdateUserRoute
    );
    it(
        'Testing the the delete specific user by id route "http://localhost:2011/api/user/delete/2',
        theAssist.theDeleteUserByIdRoute
    );
}
