//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

// scope itmes array. It can store more than one item. New itme will be push at the end of array
const items= ["Grocery Shoping", "House Cleaning", "Dish Washing", "Laundry"]; 
const workItems=[];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let day = date.getDate();

    // render ejs file name list
    res.render("List",{
        // eachtime you want to render "list", you need to provide all the variable that you want to render in a single curly bracket  
        //3. items now has a new pushed array element, pass it in the newListItems in list.ejs
        //4. go to list.ejs
        kindofDay: day, newListItems:items 
    });
});

app.post("/", function(req, res){

    // 1.retreat name = newItem input from list.ejs and place into the variable called item
    const item = req.body.newItem;
    
    //2.push the new input of item that is from newItem into items array
    items.push(item);

    res.redirect("/"); // goes to app.get("/", function(req,res){...})
});


app.listen(3000, function () {
    console.log("Server started on port 3000.");
});