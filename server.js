let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let app = express();
let PORT = 3000;

// setup app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
let jsonParser = bodyParser.json();

// Data
var characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }
];

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view.html"));
});

// api route
app.get("/api/characters/:character", (req, res) => {
  for (const [key, value] of characters.entries()) {
    if (value.routeName === req.params.character) {
      return res.json(characters[key]);
    }
  }
  return res.send("no character found");
});

// create new characters
app.post("/api/characters", jsonParser, (req, res) => {
  let newCharacter = req.body;
  console.log(newCharacter);
  characters.push(newCharacter);

  return res.json(newCharacter);
});

// listener
app.listen(process.env.PORT || PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});
