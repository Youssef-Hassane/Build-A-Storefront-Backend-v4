import theAssist from './Assist/product-assist';

describe(
    'Test the *product* Model Of Database that is in the "src/Models-Of-Database/Product/product.ts" file:',
    callbackFunction
);

function callbackFunction() {
    it(
        'Testing the createProduct function that create product in the database',
        theAssist.createProductForTesting
    );
    it(
        'Testing the showAllProduct function that show/display all the products in the database',
        theAssist.showAllProductForTesting
    );
    it(
        'Testing the showSpecificProductByID function that show/display specific product from the database',
        theAssist.showSpecificProductByIDForTesting
    );
    it(
        'Testing the updateSpecificProduct function that update specific Product in the database',
        theAssist.updateSpecificProductForTesting
    );
    it(
        'Testing the deleteSpecificProductByID function that delete specific Product from the database',
        theAssist.deleteSpecificProductByIDForTesting
    );
    afterAll(theAssist.afterTesting);
}
