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

    console.log("\nConnected as Supervisor ID " + connection.threadId + ".\n");

    mainMenu();
})

function mainMenu() {

    inquirer.prompt({
        type: "list",
        name: "action",
        message: "Welcome to the supervisor's console. Select your action:",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
            "Exit"
        ]
    }).then(function(answer) {

        switch (answer.action) {

            case "View Product Sales by Department":
                viewSales();
                break;

            case "Create New Department":
                createDepartment();
                break;

            case "Exit":
                connection.end();
                break;

            default:
                break;
        };
    })

}

function viewSales() {

    // connection.query("SELECT SUM(product_sales), products.department_name FROM products LEFT JOIN departments ON products.department_name=departments.department_name GROUP BY products.department_name", function(err, res) {
    //     if (err) throw err;
    //     console.log(res);
    // });

    // connection.query("SELECT departments.department_id, products.department_name, departments.over_head_costs, products.product_sales FROM departments LEFT JOIN products ON departments.department_name=products.department_name SUM(product_sales) FROM products", function(err, res) {
    //     if (err) throw err;

    //     var data = [["Department ID", "Department", "OHC", "Product Sales"]];

    //     res.forEach(function(one) {
    //         data.push([one.department_id, one.department_name, one.over_head_costs, one.product_sales]);
    //     });

    //     var output = table(data);
    //     console.log(output);
    // });

    // connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments LEFT JOIN(SELECT SUM(products.product_sales), department_name FROM products GROUP BY department_name)x ON x.department_name=departments.department_name", function(err, res) {
    //     if (err) throw err;

    //     console.log(res);
    // })

    connection.query("SELECT ds.*, prod_sales, prod_sales - over_head_costs AS profit FROM departments ds LEFT JOIN (SELECT SUM(product_sales) AS prod_sales, department_name  FROM products ps GROUP BY department_name) AS ps ON ds.department_name=ps.department_name", function(err, res) {
        if (err) throw err;

        // console.log(res);

        // console.log(res[0]);

        var data = [["Department ID", "Department", "OHC", "Product Sales", "Profitability"]];

        res.forEach(function(one) {
            data.push([one.department_id, one.department_name, one.over_head_costs, one.prod_sales, one.profit]);
        });
    
        var output = table(data);
        console.log(output);

        mainMenu();
    })

}

function createDepartment() {

    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Please enter the new department's name:"
        },
        {
            type: "input",
            name: "costs",
            message: "Please enter the new department's overhead costs:",
            validate: function(input) {
                if (isNaN(input) === false && parseInt(input) > 100) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(newDepartment) {
        connection.query("INSERT INTO departments SET ?",
        {
            department_name: newDepartment.department,
            over_head_costs: parseInt(newDepartment.costs)
        },
        function(err, res) {
            if (err) throw err;

            console.log("\n" + res.affectedRows + " department added!\n");

            mainMenu();
        })

    })

}