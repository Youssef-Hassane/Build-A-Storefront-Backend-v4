import theUser from '../../../Models-Of-Database/User/user';
import theSQL from '../../../Models-Of-Database/User/SQL-OfUser';
import theTypeOfUser from '../../../Models-Of-Database/User/typeOfUser';
import theDatabaseForTest from '../../../Database-Of-Project/database';
import { PoolClient } from 'pg';

const modelOfTheUser = new theUser();

const userInformationForTesting: theTypeOfUser = {
    first_name: 'FirstNameTest',
    last_name: 'LastNameTest',
    password: 'PasswordTest',
} as theTypeOfUser;

const userInformationForTesting_toEqual: theTypeOfUser = {
    id: 1,
    first_name: 'FirstNameTest',
    last_name: 'LastNameTest',
} as theTypeOfUser;

const userInformationForTestingAfterUpdate: theTypeOfUser = {
    id: 1,
    first_name: 'FirstNameTestAfterUpdated',
    last_name: 'LastNameTestAfterUpdated',
    password: 'PasswordTest',
} as theTypeOfUser;

async function createUserForTesting(): Promise<void> {
    const createTheUserForTesting = await modelOfTheUser.createUser(
        userInformationForTesting
    );
    console.log('The user was created SUCCESSFULLY.');
    console.log(createTheUserForTesting);
    expect(createTheUserForTesting).toEqual(userInformationForTesting_toEqual);
}

async function showAllUsersForTesting(): Promise<void> {
    const ShowAllTheUsersForTesting = await modelOfTheUser.showAllUsers();
    const theLengthOfTheUsers: number = ShowAllTheUsersForTesting.length;
    console.log('The following are all the users in the database:');
    console.log(ShowAllTheUsersForTesting);
    expect(theLengthOfTheUsers).toEqual(1);
    expect(ShowAllTheUsersForTesting[0].first_name).toEqual('FirstNameTest');
    expect(ShowAllTheUsersForTesting[0].last_name).toEqual('LastNameTest');
}

async function showSpecificUserByIDForTesting(): Promise<void> {
    const showSpecificUserByIDForTesting =
        await modelOfTheUser.showSpecificUserByID('1');
    console.log('The following is the selected user from the database:');
    console.log(showSpecificUserByIDForTesting);
    const ID = showSpecificUserByIDForTesting.id;
    const FirstName = showSpecificUserByIDForTesting.first_name;
    const LastName = showSpecificUserByIDForTesting.last_name;
    expect(ID).toEqual(1);
    expect(FirstName).toEqual('FirstNameTest');
    expect(LastName).toEqual('LastNameTest');
}

async function updateSpecificUserForTesting(): Promise<void> {
    const updateSpecificUser = await modelOfTheUser.updateSpecificUser(
        userInformationForTestingAfterUpdate
    );
    console.log('The user has been updated SUCCESSFULLY.');
    console.log(updateSpecificUser);
    const FirstName = updateSpecificUser.first_name;
    const LastName = updateSpecificUser.last_name;
    expect(FirstName).toEqual('FirstNameTestAfterUpdated');
    expect(LastName).toEqual('LastNameTestAfterUpdated');
}

async function authUserByFirstNameLastNamePasswordForTesting(): Promise<void> {
    const AuthUserByFirstNameLastNamePassword =
        await modelOfTheUser.authUserByFirstNameLastNamePassword(
            'FirstNameTestAfterUpdated',
            'LastNameTestAfterUpdated',
            'PasswordTest'
        );
    console.log('You are authorized user.');
    if (AuthUserByFirstNameLastNamePassword) {
        const FirstName = AuthUserByFirstNameLastNamePassword.first_name;
        const LastName = AuthUserByFirstNameLastNamePassword.last_name;
        expect(FirstName).toEqual('FirstNameTestAfterUpdated');
        expect(LastName).toEqual('LastNameTestAfterUpdated');
    }
}

async function deleteSpecificUserByIDForTesting(): Promise<void> {
    const deleteSpecificUserByID = await modelOfTheUser.deleteSpecificUserByID(
        '1'
    );
    console.log('The user has been deleted SUCCESSFULLY.');
    console.log(deleteSpecificUserByID);
    expect(deleteSpecificUserByID.id).toEqual(1);
}

async function afterTesting(): Promise<void> {
    const openConnectionWithTheDatabase: PoolClient =
        await theDatabaseForTest.connect();
    await openConnectionWithTheDatabase.query(theSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theSQL.resetID);
    openConnectionWithTheDatabase.release();
}

export default {
    createUserForTesting,
    showAllUsersForTesting,
    showSpecificUserByIDForTesting,
    updateSpecificUserForTesting,
    authUserByFirstNameLastNamePasswordForTesting,
    deleteSpecificUserByIDForTesting,
    afterTesting,
};
