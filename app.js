//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

// scope itmes array. It can store more than one item. New itme will be push at the end of array
// const items = ["Grocery Shoping", "House Cleaning", "Dish Washing", "Laundry"];
// const workItems=[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoDB", {
    useUnifiedTopology: true
});


const todoItem = new mongoose.Schema({
    content: {
        type: String,
        require: [true, "Please check your data entry, no input detected"]
    }
});

//Create Schema with singular name of colleciton "List" -> it will turn into "lists"
const TodoItem = mongoose.model("List", todoItem);

app.get("/", function (req, res) {

    TodoItem.find(function (err, items) {

        res.render("List", {
            kindofDay: date.getDay(),
            newListItems: items.map(item => item.content)
        });
    });
});

app.post("/", function (req, res) {

    
    const item = req.body.newItem;

    const todoItem = new TodoItem({
        content: item
    });
    
    todoItem.save();

    res.redirect("/"); 
});


app.listen(3001, function () {
    console.log("Server started on port 3000.");
});