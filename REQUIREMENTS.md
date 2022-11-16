# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index
-   Show
-   Create [token required]
-   [OPTIONAL] Top 5 most popular products
-   [OPTIONAL] Products by category (args: product category)

| Action                | Request | EndPoint                 | ID           | Body (JSON)                                                                  | Body (JSON) Example                                                   | Token    |
| --------------------- | ------- | ------------------------ | ------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------- |
| Add Product           | POST    | product/add              | Not Required | { "product_name": String, "price":String, "category":String }                | { "product_name": "M4", "price":"999.50", "category":"Gug" }          | Required |
| Show All Products     | GET     | product/show-all-product | Not Required | --                                                                           | --                                                                    | Required |
| Show Specific Product | GET     | product/show-product/:ID | Required     | --                                                                           | --                                                                    | Required |
| Update Product        | PATCH   | product/update/:ID       | Required     | { "id": Integer, "product_name": String, "price":String, "category":String } | { "id": 1, "product_name": "M4", "price":"750.50", "category":"Gug" } | Required |
| Delete Product        | DELETE  | product/delete/:ID       | Required     | --                                                                           | --                                                                    | Required |

#### Users

-   Index [token required]
-   Show [token required]
-   Create N[token required]

| Action               | Request | EndPoint           | ID           | Body (JSON)                                                       | Body (JSON) Example                                                      | Token        |
| -------------------- | ------- | ------------------ | ------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------ |
| Add User             | POST    | user/add           | Not Required | { "first_name": String, "last_name": String, "password": String } | { "first_name": "youssef", "last_name": "hassane", "password": "12345" } | Not Required |
| Authorization        | POST    | user/auth          | Not Required | { "first_name": String, "last_name": String, "password": String } | { "first_name": "youssef", "last_name": "hassane", "password": "12345" } | Not Required |
| Show All Users       | GET     | user/show-all-user | Not Required | --                                                                | --                                                                       | Required     |
| Show Specific User   | GET     | user/show-user/:ID | Required     | --                                                                | --                                                                       | Required     |
| Update Specific User | PATCH   | user/update/:ID    | Required     | { "id": String, "first_name": String, "last_name": String }       | { "id": "1", "first_name": "youssef", "last_name": "hassan" }            | Required     |
| Delete Specific User | DELETE  | user/delete/:ID    | Required     | --                                                                | --                                                                       | Required     |

#### Orders

-   Current Order by user (args: user id)[token required]
-   [OPTIONAL] Completed Orders by user (args: user id)[token required]

| Action                   | Request | EndPoint             | ID           | Body (JSON)                                                                     | Body (JSON) Example                                          | Token    |
| ------------------------ | ------- | -------------------- | ------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| Add Order                | POST    | order/add            | Not Required | { "id_of_user": String, "order_status": String }                                | { "id_of_user": "1", "order_status": "Active" }              | Required |
| Insert to the user order | POST    | /insert/:ID          | Required     | { "quantity": Integer, "id_of_the_order":Integer, "id_of_the_product":Integer } | { "quantity":3, "id_of_the_order":1, "id_of_the_product":1 } | Required |
| Show All Orders          | GET     | order/show-all-order | Not Required | --                                                                              | --                                                           | Required |
| Show Specific Order      | GET     | order/show-order/:ID | Required     | --                                                                              | --                                                           | Required |
| Update Specific Order    | PATCH   | order/update/:ID     | Required     | { "id": Integer, "id_of_user": String, "order_status": String }                 | { "id":1, "id_of_user": "1", "order_status": "Completed" }   | Required |
| Delete Specific Order    | DELETE  | order/delete/:ID     | Required     | --                                                                              | --                                                           | Required |

## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category

| Name         | Type            | Primary Key | Foreign Key |
| ------------ | --------------- | ----------- | ----------- |
| id           | SERIAL          | YES         | NO          |
| product_name | VARCHAR (250)   | NO          | NO          |
| price        | DECIMAL (10, 2) | NO          | NO          |
| category     | VARCHAR ( 250 ) | NO          | NO          |

#### User

-   id
-   firstName
-   lastName
-   password

| Name       | Type            | Primary Key | Foreign Key |
| ---------- | --------------- | ----------- | ----------- |
| id         | SERIAL          | YES         | NO          |
| first_name | VARCHAR ( 250 ) | NO          | NO          |
| last_name  | VARCHAR ( 250 ) | NO          | NO          |
| password   | VARCHAR ( 250 ) | NO          | NO          |

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)

| Name         | Type            | Primary Key | Foreign Key   |
| ------------ | --------------- | ----------- | ------------- |
| id           | SERIAL          | YES         | NO            |
| id_of_user   | BIGINT          | NO          | YES users(ID) |
| order_status | VARCHAR ( 250 ) | NO          | NO            |
| products     | TEXT []         | NO          | NO            |

#### User_Order

| Name              | Type    | Primary Key | Foreign Key      |
| ----------------- | ------- | ----------- | ---------------- |
| id                | SERIAL  | YES         | NO               |
| quantity          | INTEGER | NO          | NO               |
| id_of_the_order   | BIGINT  | NO          | YES orders(id)   |
| id_of_the_product | BIGINT  | NO          | YES products(id) |
