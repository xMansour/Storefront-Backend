# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index [GET] `/products`  
    ex. `GET 127.0.0.1:3000/products/`  
- Show (args: product id) [GET] `/products/:id`
    ex. `GET 127.0.0.1:3000/products/1`
- Create (args: Product)[token required] [POST] `/products`  
    You should provide the product name, price, category as query paramters  
    ex. `POST 127.0.0.1:3000/products/?name=Led Lamp&price=50&category=Lightning`

#### Users
- Index [token required] [GET] `/users`  
    ex. `GET 127.0.0.1:3000/users`
- Show (args: id)[token required] [GET] `/users/:id`  
    ex. `GET 127.0.0.1:3000/users/1`
- Create (args: User)[token required] [POST] `/users`  
    You should provide `userName`, `firstName`, `lastName` and `password` as query paramters.  
    ex. `POST 127.0.0.1:3000/users/?firstName=Mahmoud&lastName=Mansour&userName=xMansour&password=123456`
- authenticate (userName:string, password:string) [GET] `/auth`  
    You should provide `userName` and `password` as query paramters.  
    ex. `GET 127.0.0.1:3000/auth/?userName=xMansour&password=123456`
- deleteUser (userName:string, password:string)[token required] [DELETE] `/users`  
    You should provide `userName` and `password` as query paramters.  
    ex. `DELETE 127.0.0.1:3000/users/?userName=xMansour&password=123456`
    
#### Orders
- Current Order by user (args: user id)[token required] [GET] `/orders/:userId`  
    ex. `GET 127.0.0.1:3000/orders/1`
- Index [token required] [GET] `/orders`  
    ex. `GET 127.0.0.1:3000/orders/`
- Create (args: Order)[token required] [POST] `/orders/:userId`  
    ex. `POST 127.0.0.1:3000/orders/1` this will create an order for user with id=1.
- addProduct (args: quantity, orderId, productId)[token required] [POST] `/orders/:orderId/products/:productId?quantity=x`  
    You should provide `quantity` query paramter.  
    ex. `127.0.0.1:3000/orders/4/products/1?quantity=50` this will add 50 of product with id=1 to order with id=4.

## Data Shapes
#### Product
-  id `SERIAL PRIMARY KEY`
- name `VARCHAR NOT NULL`
- price `INTEGER NOT NULL`
- [OPTIONAL] category `VARCHAR`

#### User
- id `SERIAL PRIMARY KEY`
- first_name `VARCHAR NOT NULL`
- last_name `VARCHAR`
- user_name `VARCHAR UNIQUE`
- password `VARCHAR`

#### Orders
- id `SERIAL PRIMARY KEY`
- user_id `BIGINT REFERENCES users(id)`
- status `VARCHAR(10)`


#### orders_products
- id `SERIAL PRIMARY KEY`
- order_id `INTEGER NOT NULL REFERENCES orders(id)`
- product_id `INTEGER NOT NULL REFERENCES products(id)`
- quantity `INTEGER NOT NULL`

