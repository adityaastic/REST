const express = require("express");
const { request } = require("http");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
 

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set up the static files middleware
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username : "shradhakhapra",
        content: "Hard work is important to achieve success"
    },
    {
        id: uuidv4(),
        username: "rahulkumar",
        content: "I got selected for my dream job!"
    }
];




app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});



app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {

    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({username,content,id} )
    res.redirect("/posts");
});



app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post }); // Pass the specific post, not the entire list
});


app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    const post = posts.find((p) => id === p.id);
    post.content = newContent;
   
    res.redirect("/posts");
});


app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });  // Pass the post object to the view
});


app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    // Assuming posts is an array of objects with an 'id' property
    posts = posts.filter(post => post.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("Listening on port: 8080");});