## User Story
* AS A manager at an internet retail company
* I WANT a back end for my e-commerce website that uses the latest technologies
* SO THAT my company can compete with other e-commerce companies

## Acceptance Criteria
* GIVEN a functional Express.js API
* WHEN I add 
  - my database name, 
  - MySQL username, 
  - and MySQL password to an environment * variable file
* THEN I am able to connect to a database using Sequelize
* WHEN I enter schema and seed commands
* THEN a development database is created and is seeded with test data
* WHEN I enter the command to invoke the application
* THEN my server is started and the Sequelize models are synced to the MySQL database
* WHEN I open API GET routes in Insomnia Core for categories, products, or tags
* THEN the data for each of these routes is displayed in a formatted JSON
* WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
* THEN I am able to successfully create, update, and delete data in my database



# TODO
* create the Classes for each model
  - updated the index.js for the model dir to have the correct relations between tables
* create the api routes
  - DONE product-routes.js
  - DONE category-routes.js
  - tag-routes.js

## Database Models
* DONE Category
  - DONE id
    * DONE integer
    * DONE null vals not allowed
    * DONE set as primary key
    * DONE uses auto_increment
  - DONE <code>category_name</code>
    * DONE string
    * DONE null vals not allowed

* DONE Product
  - DONE <code>id</code>
    * DONE integer
    * DONE null vals not allowed
    * DONE primary key
    * DONE auto increment
  - DONE <code>product_name</code>
    * DONE string
    * DONE null vals not allowed
  - DONE <code>price</code>
    * DONE decimal
    * DONE NOT NULL
    * DONE valiates that the value is a decimal(?)
  - DONE <code>stock</code>
    * DONE Integer
    * DONE NOT NULL
    * DONE default value of 10
    * DONE validates that the value is numeric
  - DONE <code>category_id</code>
    * DONE integer
    * DONE references the <code>category</code> model's <code>id</code>

* DONE Tag
  - DONE <code>id</code>
    * DONE integer
    * DONE NOT NULL
    * DONE primary key
    * DONE auto increment
  - DONE <code>tag_name</code>
    * DONE string
  
* DONE ProductTag
  - DONE <code>id</code>
    * DONE integer
    * DONE NOT NULL
    * DONE primary key
    * DONE auto increment
  - DONE <code>product_id</code>
    * DONE integer
    * DONE references <code>product</code> model's <code>id</code>
  - DONE <code>tag_id</code>
    * DONE integer
    * DONE references the <code>tag</code> model's <code>id</code>

## Associations

* DONE ```Product``` belongs to ```Category```, as a category can have multiple products but a product can only belong to one category.
* DONE ```Category``` has many ```Product``` models.
* DONE ```Product``` belongs to many ```Tag``` models. Using the ```ProductTag``` through model, allow products to have multiple tags and tags to have many products
* DONE ```Tag``` belongs to many ```Product``` models.

# hint
* Make sure you set up foreign key relationships that match the column we created in the respective models.

## Fill Out the API Routes to Perform RESTful CRUD Operations
* IN-PROGRESS Fill out the unfinished routes in product-routes.js, tag-routes.js, and category-routes.js to perform create, read, update, and delete operations using your Sequelize models.

## Seed the database
* DONE After creating the models and routes, run npm run seed to seed data to your database so that you can test your routes.

## sync sequelize to db on server start
* DONE Create the code needed in server.js to sync the Sequelize models to the MySQL database on server start.

