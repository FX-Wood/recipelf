var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();
const { logMiddleWare } = require("./lib/logger");

var authRouter = require("./routes/auth");
var recipegenRouter = require("./routes/recipegen");
var ingredientRouter = require("./routes/ingredient");

var app = express();

app.use(logMiddleWare);
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ message: "ok" }));

app.use("/auth", authRouter);
app.use("/recipegen", recipegenRouter);
app.use("/ingredient", ingredientRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Sorry can't find that!" });
});

// error handler
app.use(function (err, req, res, next) {
  // print to console for dev stuff
  console.error(err.message);
  console.error(err.stack);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "there was an error" });
});

app.listen(app.get("port") || 5000),
  () => console.log("express app is listening on port", app.get("port"));

module.exports = app;
