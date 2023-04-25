const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
// const dbURI = `mongodb+srv://red:abcd1234@cluster0.tkwq09j.mongodb.net/?retryWrites=true&w=majority`;

// async function connect() {
//   try {
//     await mongoose.connect(dbURI);
//     console.log("connected succesful");
//   } catch (error) {
//     console.error(error);
//   }
// }
function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://red:abcd1234@cluster0.tkwq09j.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log(`db succesfully`))
    .catch((err) => console.log(err.message));
}
dbConnect();
//register view engine
app.set("view engine", "ejs");
app.set("views", "view");

const local = 3000;
app.listen(local);

app.use(express.static("public"));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  const blogs = [
    { title: "jsodaewnfoidfnod", snippet: "jsodn oejojoc ijoenfi" },
    { title: "Mario finds Start", snippet: "asodfjkoawejf ijdfkoja" },
    { title: "Being Boss", snippet: "lorem ipusm diowl ielsn oeaie." },
  ];

  res.render("index", { title: "home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});
//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
