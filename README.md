# Storefront Backend Project

## Overview

This is the second project of the advanced track (Web Development Advanced) that is provided by Udacity. The project is about backend of online store.

Hi there,
This Storefront Backend project was developed by Youssef Hassane.
This is the second project of the advanced track (Web Development Advanced) that is provided by Udacity and in cooperation with FWD (Egypt Future Work is Digital Scholarship). The project is about a backend of online store.

Project Summary

Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.

Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.

---

**Version 1.0.0**

In order to run the project you should do the following:

Firstly, you should download node.js in you machine (You can download node.js from the following link: https://nodejs.org/en/download/)

Secondly, you should download the project by clicking of the green button "code" and then clicking on "Download ZIP".

Watch the below short video:

[![Build-A-Storefront-Backend-v2](https://img.youtube.com/vi/zkpTweDWEis/0.jpg)](https://www.youtube.com/watch?v=zkpTweDWEis)

Thirdly, you should open the file and create the .ENV file and add the following:

**.ENV file:**

```bash
THE_PORT_NUMBER_OF_THE_SERVER_ENV     = 2011
THE_POSTGRES_HOST_NAME                = localhost
THE_POSTGRES_PORT_NUMBER              = 5432
THE_POSTGRES_DATABASE_FOR_THE_PROJECT = store_database
THE_POSTGRES_DATABASE_FOR_TESTING     = store_database_test
THE_POSTGRES_USER                     = postgres
THE_POSTGRES_PASSWORD_OF_THE_DATABASE = **Your Password**
ENV                                   = development
PEPPER_OF_PASSWORD                    = youssef
SALT                                  = 10
TOKEN                                 = hassane
```

Watch the below short video:

[![Build-A-Storefront-Backend-v2](https://img.youtube.com/vi/DnZjH0G0-OI/0.jpg)](https://www.youtube.com/watch?v=DnZjH0G0-OI)

Fourthly, you should two database "store_database" and "store_database_test".

```bash
CREATE DATABASE store_database;
```

```bash
CREATE DATABASE store_database_test;
```

Watch the below short video:

[![Build-A-Storefront-Backend-v2](https://img.youtube.com/vi/s-Rq5O1rMkg/0.jpg)](https://www.youtube.com/watch?v=s-Rq5O1rMkg)

Fifthly, you should open the terminal on the project directory and type the command:

```bash
yarn
```

OR

```bash
npm install
```

Watch the below short video:

[![Build-A-Storefront-Backend-v2](https://img.youtube.com/vi/lJboMoRsi54/0.jpg)](https://www.youtube.com/watch?v=lJboMoRsi54)

Sixthly, you can follow the following command in order to start/run the project:

In order to build the project and start testing:

```bash
yarn test
```

Watch the below short video:

[![Build-A-Storefront-Backend-v2](https://img.youtube.com/vi/XjJ94bqNWFw/0.jpg)](https://www.youtube.com/watch?v=XjJ94bqNWFw)

In order to build the project:

```bash
yarn build
node build/Server/server.js
```

![Screenshot1](https://github.com/Youssef-Hassane/Screen-Shot-3/blob/main/1.png)

In order to run Prettier:

```bash
yarn prettier
```

In order to run ESlint:

```bash
yarn lint
```

---

## Example Of Running The User EndPoint

Watch the below short video:

[![Build-A-Storefront-Backend-v2](https://img.youtube.com/vi/XenZjWlyELk/0.jpg)](https://www.youtube.com/watch?v=XenZjWlyELk)

---

## Contributors

- Youssef Hassane
