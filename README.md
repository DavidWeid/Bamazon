# Bamazon

## Overview

Bamazon is a command-line interface (CLI) application that serves as an Amazon-like storefront thanks to MySQL and Node.js. This application will take in commands from customers, managers, or supervisors and run appropriate interactions while displaying relevant data according to the user.

Customers will be able to shop from the storefront.
Managers will be able to view low inventory, add inventory, and add products.
Supervisors will be able to view sales by department and create new departments.

## Using and Testing Bamazon

This application requires the use of npm packages and the creation of a MySQL database.

After cloning the repository or downloading the files found in the repository, run `npm install` to install:
  - chalk
  - inquirer
  - mysql
  - table
  
Then use the [Schema SQL](schema.sql) file to create the neccessary *bamazon* database. Once the npm packages are installed and the database created, you can use the Bamazon application.

To use the **customer** application, run `node bamazonCustomer.js`.
