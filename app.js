//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useUnifiedTopology: true
});

//create Schema (structure of objects)
const itemSchema = new mongoose.Schema({
    content: {
        type: String,
        require: [true, "Wrong input"]
    }
});

//create model for collections 
const Item = mongoose.model("Item", itemSchema);
//Item: capital I, mongoose model is usually capitalized
//item: singular version of collection name

const itemZero = new Item({
    content: "Welcome to your todo List!"
});

const itemOne = new Item({
    content: "Hit the + button to add a new item."
});

const itemTwo = new Item({
    content: "<-- Hit this to delete an item."
});

const defaultItems = [itemZero, itemOne, itemTwo];




app.get("/", function (req, res) {
    //date.getDate() calling getDate function from date.js
    let day = date.getDate();


    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("succes!");
                }
            });
            res.redirect("/");
        } else {
            // render ejs file name list
            res.render("List", {
                kindofDay: day,
                newListItems: foundItems
            });
        }
    });
});

app.post("/", function (req, res) {


    const itemName = req.body.newItem; //from list.ejs name=newItem

    const item = new Item({
        content: itemName
    })

    item.save();
    res.redirect("/");

});

app.post("/delete", function (req, res) {

    // bring item.id value from list.ejs and store in checkedItemID
    const checkedItemID = req.body.checkbox;

    //following function (findByIdAndRemove) find the ID and delete the item related to ID. Warning: must have call back function
    Item.findByIdAndRemove(checkedItemID, function(err) {
        if (!err) {
            res.redirect("/");
        } 
    });
});


app.listen(3001, function () {
    console.log("Server started on port 3000.");
});