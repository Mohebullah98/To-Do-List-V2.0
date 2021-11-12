const express = require("express");
const port = 3000;
const app = express();
const date = require(__dirname + "/date.js");
const mongoose =require("mongoose");
const _ = require("lodash");
const ejs =require("ejs");
app.use(express.urlencoded({
  extended: true
}));
mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemSchema = new mongoose.Schema({ //simple schema with name for list items
  name:String
});
const listSchema = new mongoose.Schema({ //schema for custom lists
  name:String,
  items:[itemSchema] //array of item documents
});
const List = mongoose.model("List",listSchema);
const Item = mongoose.model("Item",itemSchema);
//Default items
const item1 = new Item({
  name:"Water the Plants"
});
const item2 = new Item({
  name:"Feed the Cats"
});
const item3 = new Item({
  name:"Buy Groceries"
});
let defaultItems = new Array(item1,item2,item3); //initialize items array with default docs

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) { //get to do list page
  let day = date();
  Item.find({},function(err,docs){
    if(docs.length===0){ //if there are no docs in db, add the default docs
      Item.insertMany(defaultItems,function(err,docs){
        if(err) console.log(err);
        else console.log("Items successfully inserted");
        res.redirect("/"); //redirect to get method so the updated docs can be rendered.
      });
    }
    else{
    res.render("list", {
      listTitle: day, //current day rendered into ejs
      newItems: docs //array of docs rendered into ejs
    });
  }
  });
});

app.post("/", function(req, res) {
  let day =date();
  const listName=req.body.list; //tap into value of button with name list(list name)
  const item = new Item({ //create new doc with text from input
    name:req.body.toDo
  });
  if (item.name == undefined) { //if text box doesn't have value, then home button was pressed, redirect to home(don't add anything to db).
    res.redirect("/");
  }
  else{
    if(listName===day){ //if we're on home page
  item.save(); //save the doc to db
  console.log(item);
  res.redirect("/"); //redirect to home
}
else{
  List.findOne({name:listName},function(err,doc){
    //otherwise add to custom list and redirect to custom list page
    doc.items.push(item);
    doc.save();
    res.redirect("/"+listName);
  });
}
}
});
//doc ids are set in value of their checkboxes so we can delete specific items
app.post("/delete",function(req,res){
  let day=date();
  const id = req.body.checkbox;
  const listName=req.body.listName;
  if(listName===day){//check if on home page
  Item.deleteOne({_id:id},function(err,result){//delete item if on home
    if(err) console.log(err);
    res.redirect("/");
  });
}
else{//find and remove item with given id from the corresponding list's items array
  List.findOneAndUpdate({name:listName},{$pull:{items:{_id:id}}},function(err,doc){
    doc.save();
    res.redirect("/"+listName);
  })
}
});
app.post("/about", function(req, res) { //redirect to about page
  res.redirect("/about");
});
app.post("/work", function(req, res) { //redirect to work page from button
  res.redirect("/work");
});
app.get("/about", function(req, res) {
  res.render("about");
});
//load pages for custom lists
app.get("/:customList",function(req,res){
  const customListTitle= _.capitalize(req.params.customList); //the title of the customList from url, will be capitalized.

  List.findOne({name:customListTitle},function(err,doc){
    if(!err){
    if(doc){ //list already exists
      res.render("list",{ //render page with list items
        listTitle:doc.name,
        newItems:doc.items
      });
    }
    else{ //list doesn't exist, so create new one
      const list = new List({
        name:customListTitle,
        items:defaultItems
      });
      list.save();
      res.redirect("/"+customListTitle); //redirect back to custom page to render list items
    }
  }
  });
});

app.listen(port, function(req, res) {
  console.log("Server has started up on Port 3000");
});
