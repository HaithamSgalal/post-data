import express from "express";
import bodyParser from "body-parser";
import { readFile, readFileSync, writeFile, writeFileSync } from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const savedPosts = JSON.parse(readFileSync("./public/mynewfile3.json"));
console.log(savedPosts);

app.get("/add-post", (request, respond) => {
  respond.render("Add-post.ejs");
});

app.get("/", (request, respond) => {
  respond.render("home.ejs", { AllPosts: savedPosts });
});

app.post("/add-post", (request, respond) => {
  const newPostData = request.body;
  
 

savedPosts.push(newPostData);

  console.log("Saved Posts", savedPosts);

  writeFile("./public/mynewfile3.json", JSON.stringify(savedPosts), (err) => {
    console.log("Error ==============>>>", err);
  });

  respond.render("Add-post.ejs", { success: "your post has been added" });
});

app.listen(port, () => {
  console.log(`Your server in running on ${port}`);
});
