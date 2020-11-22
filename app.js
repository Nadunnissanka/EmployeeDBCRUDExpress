const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

//database connection
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'empdb'
});

//connection function
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
});

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//send to port 3000
app.get('/',(req, res)=>{
    //get data form sql
    let sql = "SELECT * FROM tbl_resourses";
    let query = connection.query(sql, (err, rows) =>{
        if (err) throw err;
        res.render('emp_index',{
            title:'Emp Database',
            tbl_resourses : rows
        });
    });
});

// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});