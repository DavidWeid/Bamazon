var inquirer = require("inquirer");

var displayShop = function() {

    // Display info from products table

};

var userShop = function() {

    inquirer.prompt([
        {
            type: "input",
            name: "product_id",
            message: "Please enter the product id of your desired item:",
            validate: function(input) {

                if (isNaN(input) === false && parseInt(input) > 0) {
                    return true;
                }
                
                return false;
            }
        }

    ]).then(function(answer) {

        //Function

    });

};

userShop();