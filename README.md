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
- - -
To use the **customer** application, run `node bamazonCustomer.js`.

Running the application will first display all items in the storefront. Even items that are not in stock are displayed. The items listed include the following information:
  - Item ID
  - Item Name
  - Item Department
  - Item Price
  - Item Stock
  
After displaying all items, the application prompts the user twice
>Please enter the product ID of your desired item

and then

>Please enter the desired quantity

For the first prompt, the user must enter a number. This number is made to match the Item ID found in the table. For example, entering **3** for the ID corresponds to the item with the name **USB Coffee Warmer**.

For the second prompt, the user must enter a number, like before. This number is made to represent the number of items (quantity) with the previously entered ID that the user wants to purchase. For example, entering **2** for the quantity corresponds to **2x** the USB Coffee Warmer.

After entering the item ID and the desired quantity, the application will take the order, if possible, and display the total cost of the purchase. The application then prompts the user with the option to continue shopping. If the user chooses "Yes", the application starts up again with an updated storefront and the same prompt for product ID as before.

**Customer Restrictions**

For the product ID, the user must enter a number > 0. Negative numbers and string values do not affect the prompt. If the user enters a number that does not correspond to an item, the application informs the user that the item does not exist and then prompts the user to continue shopping or exit.

For the product quantity, the user must enter a number > 0. Negative numbers and string values do not affect the prompt. If the user enters a quantity greater than the total quantity of the item, then the application informs the user that the storefront does not have that much in stock and then prompts the user to continue shopping or exit.
- - -
