import theAssist from '../Models-Of-Database/Assist/user-assist';

describe(
    'Test the *user* Model Of Database that is in the "src/Models-Of-Database/user.ts" file:',
    callbackFunction
);

function callbackFunction() {
    it(
        'Testing the createUser function that create user in the database',
        theAssist.createUserForTesting
    );
    it(
        'Testing the showAllUsers function that show/display all the users in the database',
        theAssist.showAllUsersForTesting
    );
    it(
        'Testing the showSpecificUserByID function that show/display specific user from the database',
        theAssist.showSpecificUserByIDForTesting
    );
    it(
        'Testing the updateSpecificUser function that update specific user in the database',
        theAssist.updateSpecificUserForTesting
    );
    it(
        'Testing the authUserByFirstNameLastNamePassword function',
        theAssist.authUserByFirstNameLastNamePasswordForTesting
    );
    it(
        'Testing the showSpecificUserByID function that show/display specific user from the database',
        theAssist.updateSpecificUserForTesting
    );
    it(
        'Testing the deleteSpecificUserByID function that delete specific user from the database',
        theAssist.deleteSpecificUserByIDForTesting
    );
    afterAll(theAssist.afterTesting);
}
