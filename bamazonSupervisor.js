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