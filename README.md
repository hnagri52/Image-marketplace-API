# shopify-backend-challenge

Thank you for taking the time to look at my project for the Shopify Winter 2021 Internship.

This project requires the following prerequisites to setup and run:

- [Node.js](https://nodejs.org/en/) -> Framework for server side operations
- [Postgres](https://www.postgresql.org/) local db setup
- A [Cloudinary](https://cloudinary.com) developer account
- A [Stripe](https://dashboard.stripe.com/register) developer account

In order to run the project, follow these steps:

1. Clone this [repository](https://github.com/hnagri52/shopify-winter-2021-challenge.git)
2. `cd shopify-backend-challenge`
3. Create a `.env` file in the root directory. Please add the following details that are going to be personal to you:

```
CLOUD_NAME=
CLOUDINARY_API=
CLOUDINARY_SECRET=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=
JWT_SECRET=
JWT_EXPIRY_TIME_MS=
STRIPE_SECRET=
```

4. `npm install` to install all dependencies
5. `sequelize-cli db:migrate` to run the database migrations
6. `npm run server` to start the server

## Project Scope

- Users are able to upload and store images in a secure and reliable platform.
- Users can upload/delete one or multiple images
- Users can update image details
- Users can buy and sell images

This project can be modeled by two classes:

1. User

```
firstName: String
lastName: String
email: String
hashedPWD: String
```

- The password is salted and hashed using `bcrypt` before being stored in the db

2. Image

```
 userId: UUID
 name: STRING
 description: STRING
 url: STRING
 isPrivate: BOOLEAN
 quantity: INTEGER
 price: DOUBLE
 discountPercentage: FLOAT
 cloudinaryId: STRING
```

- The userId field represents the userId of the user that this image belongs to
- url is where the image can be accessed at

## User Flow

- Users can see all public images: `GET /images/`
- Users can get all personal images: `GET /images/private`
- Users can register a personal account: `POST /users/register`
- Users can login and receive their JWT: `POST /users/login`
- Users can upload personal images: `POST /images/`
- Users can buy an image from others: `POST /payment/`
- Users can delete personal images: `DELETE /images/`
- Users can update a personal iamge: `PATCH /images/:imageId`

## Testing

Tests are run using the `mocha` framework. I have created merely a simple test to demonstrate how testing would be incorporated in the project.
Due to the scope of the projects, 100% code coverage will be in the next steps of the project.

## Future Additions

- Improve deployment process: currently the project is designed to be ran locally. I can use docker to containerize this server and create a CI/CD pipeline for standard development.
- Redefine testing: Add integreation and unit tests to test all aspects of the code.
