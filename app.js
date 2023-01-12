const express = require("express");
const app = express();
const mysql = require('mysql');
const path = require('path');
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const testpool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "test"
});

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "nodemysql"
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get("/dick", (req, res) => {
    let sql = "SELECT * FROM table1 LIMIT 1";
   testpool.getConnection((err, con) => {
    if(err) throw err;
    console.log('connection as id ' + con.threadId);
     con.query(sql, (err, rows) => {
        con.release(); //return the connection to pool
        if(err) throw err;
        console.log('the data from the table is: \n', rows)
        res.send(rows);
    })
   });
});


app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE IF NOT EXISTS nodemysql";
    pool.getConnection((err, con) => {
        console.log('connection as id ' + con.threadId);
        con.query(sql, (err) => {
            con.release();
            if(err) throw err;
            res.send("Databese Created")
        });
    });
});

//Create table
app.get('/createemployeetable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))';
    pool.getConnection((err,con) => {
        if(err) throw err;
        con.query(sql, (err) => {
            con.release();
            if(err) throw err;
            res.send('Employeee Table Created')
        });
    });
});

//get 10 employees
app.get('/employee', (req, res) => {
    let sql = "SELECT * FROM employee LIMIT 10";
    pool.getConnection((err, con) => {
        if(err) throw err;
        console.log('connection as id ' + con.threadId);
         con.query(sql, (err, rows) => {
            con.release(); //return the connection to pool
            if(err) throw err;
            console.log('the data from the table is: \n', rows)
            res.send(rows);
        })
       });
})

//create an employee
app.post('/createemployee', (req, res) => {
    if(req.body.name && req.body.designation){
        let post = {name: req.body.name, designation: req.body.designation}
        let sql = "INSERT INTO employee SET ?";
        pool.getConnection((err, con) => {
            if(err) throw err;
            console.log('connection as id ' + con.threadId);
            con.query(sql, post, (err) =>{
                con.release();
                if(err) throw err;
                console.log('Employee ' + post.name + ' was added')
                res.send('Employee ' + post.name + ' was added')
            });
        });
    }
    else{
        res.send(req.body.name)
    }
});

app.listen(3000, () => {
    console.log('Server is running at port 3000')
});

//SELECT * FROM table1