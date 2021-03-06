var inquirer = require("inquirer");
var mysql = require("mysql");
var { table } = require("table");
var departments = [];

// Configure connection to bamazon database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

// Connect to bamazon database and do stuff
connection.connect(function(err) {
    if (err) throw err;

    console.log("\nConnected as Manager ID " + connection.threadId + ".\n");

    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;

        res.forEach(function(one) {
            if (departments.indexOf(one.department_name) === -1) {
                departments.push(one.department_name);
            }
        });

    })

    mainMenu();    
})

// List 5 actions to take
var mainMenu = function() {

    inquirer.prompt({
        type: "list",
        name: "action",
        message: "Welcome to the manager's console. Select your action:",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then(function(answer) {

        switch (answer.action) {

            case "View Products for Sale":
                viewItems();
                break;

            case "View Low Inventory":
                lowStock();
                break;

            case "Add to Inventory":
                addStock();
                break;

            case "Add New Product":
                addProduct();
                break;

            case "Exit":
                connection.end();
                break;

            default:
                break;
        };

    })

};

// Allow manager to see all items in the shop
function viewItems() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var data = [["ID", "Item Name", "Department", "Price", "Stock"]];

        res.forEach(function(one) {
            data.push([one.item_id, one.product_name, one.department_name, "$" + one.price, one.stock_quantity])
        });

        var output = table(data);

        console.log("\n" + output + "\n");

        mainMenu();

    });

}

// Allow manager to see all low inventory (>10) items in the shop
function lowStock() {

    connection.query("SELECT * FROM products WHERE stock_quantity<10", function(err, res) {
        if (err) throw err;

        var data = [["ID", "Item Name", "Department", "Price", "Stock"]];

        res.forEach(function(one) {
            data.push([one.item_id, one.product_name, one.department_name, "$" + one.price, one.stock_quantity])
        });

        var output = table(data);

        console.log("\n" + output + "\n");

        mainMenu();

    });

}

// Allow manager to add stock quantity to an existing item
function addStock() {

    inquirer.prompt([
        {
            type: "input",
            name: "product_id",
            message: "Please enter the product ID:",
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
            message: "Please enter the quantity to add:",
            validate: function(input) {

                if (isNaN(input) === false && parseInt(input) > 0) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function(addItem) {

        connection.query("SELECT * FROM products WHERE item_id=?", [addItem.product_id], function(err, res) {
            if (err) throw err;

            if (res[0] === undefined) {
                console.log("\nThat item does not exist.\n");
                mainMenu();
            } else {
                var newQuantity = parseInt(res[0].stock_quantity) + parseInt(addItem.quantity);
                var itemId = addItem.product_id;
                updateStockDB(newQuantity, itemId); 
            }
        })

    });

    function updateStockDB(quantity, id) {

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

            console.log("\n" + res.affectedRows + " item updated!\n");

            mainMenu();
        })

    }

}

// Allow manager to add a product to the shop
function addProduct() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the product name:"
        },
        {
            type: "list",
            name: "department",
            message: "Please enter the product department:",
            choices: departments
        },
        {
            type: "input",
            name: "price",
            message: "Please enter the product price:",
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
            message: "Please enter the product stock quantity:",
            validate: function(input) {
                if (isNaN(input) === false && parseInt(input) > 0) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(newProduct) {
        connection.query("INSERT INTO products SET ?",
        {
            product_name: newProduct.name,
            department_name: newProduct.department,
            price: parseInt(newProduct.price),
            stock_quantity: parseInt(newProduct.quantity)
        },
        function(err, res) {
            if (err) throw err;

            console.log("\n" + res.affectedRows + " product added!\n");

            mainMenu();
        });
    });    

}
