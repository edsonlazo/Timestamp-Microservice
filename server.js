const app = require("./app");

// listen for requests :)
var listener = app.listen(process.env.PORT ?? 5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
