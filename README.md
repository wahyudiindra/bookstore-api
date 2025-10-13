# bookstore-api

## Installation

- Clone the repository

        git clone https://github.com/wahyudiindra/bookstore-api.git

- Switch to the `bookstore-api` folder

- Install dependencies

        yarn install

- Copy .env.example file to .env and set environment variable

---

## Database

- The application implements Prisma with a postgreSQL database. Create a new postgreSQL database and set postgresql database settings in .env

        DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]"

- To create all tables in the new database make the database migration from the prisma schema defined in prisma/schema.prisma

        yarn db:migrate

- Now generate the prisma client from the migrated database with the following command

        yarn db:generate

- To seeder database with the following command

        yarn db:seed

---

## Start application

- To running this application with the following command

        yarn dev

- Now Open documentation API from swagger with `${HOST}:${PORT}/docs` in your browser
