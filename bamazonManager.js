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

    console.log("\nConnected as Manager ID " + connection.threadId + ".\n");

    
})