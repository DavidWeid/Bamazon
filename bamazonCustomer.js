var inquirer = require("inquirer");
var mysql = require("mysql");
var { table } = require("table");

// Configure connection to bamazon database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Grandarbiter3",
    database: "bamazon"
});

// Connect to bamazon database and do stuff
connection.connect(function(err) {
    if (err) throw err;

    console.log("\nConnected as customer ID " + connection.threadId + ".\n");

    displayShop();

});

// Display the shop to the user
var displayShop = function() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var data = [["ID", "Item Name", "Department", "Price", "Stock"]];

        res.forEach(function(one) {
            data.push([one.item_id, one.product_name, one.department_name, "$" + one.price, one.stock_quantity])
        });

        var output = table(data);

        console.log(output);

        userShop();

    });

};

// Allow user to shop from database
var userShop = function() {

    inquirer.prompt([
        {
            type: "input",
            name: "product_id",
            message: "Please enter the product ID of your desired item:",
            validate: function(input) {

                if (isNaN(input) === false && parseInt(input) > 0) {
                    return true;
                }
                
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "Please enter the desired quantity:",
            validate: function(input) {

                if (isNaN(input) === false && parseInt(input) > 0) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function(shopItem) {

        connection.query("SELECT * FROM products WHERE item_id=?", [shopItem.product_id], function(err, res) {
            if (err) throw err;

            // console.log(res[0]);

            if (res[0] === undefined) {

                console.log("\nUnfortunately that item does not exist right now.\n");

                goAgain();

            } else {

                // console.log(res[0].stock_quantity);

                if (shopItem.quantity > res[0].stock_quantity) {

                    console.log("\nUnfortunately we do not have that much in stock.\n");

                    goAgain();

                } else {

                    console.log("\nAlright!\n");

                    var newStockQuantity = parseInt(res[0].stock_quantity) - parseInt(shopItem.quantity);

                    var itemCost = res[0].price;

                    updateShop(newStockQuantity, shopItem.product_id);

                    userPay(itemCost, shopItem.quantity);

                };

            };
        });

    });

};

var goAgain = function() {

    inquirer.prompt([
        {
            type: "list",
            name: "shopMore",
            message: "Continue shopping?",
            choices: [
                "Yes",
                "No"
            ]            
        }
    ]).then(function(answer) {

        if (answer.shopMore === "Yes") {
            displayShop();

        } else {
            console.log("\nGoodbye.\n");
            connection.end();
        }
    })

};

var updateShop = function(quantity, id) {

    connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: quantity
        },
        {
            item_id: id
        }
    ],
    function(err, res) {
        if (err) throw err;

    })

};

var userPay = function(cost, quantity) {

    console.log("\nYour total cost was $" + (cost * quantity) + ".\n");

    goAgain();

};