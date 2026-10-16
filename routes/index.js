/**
 * Defines the homepage and routes used to demonstrate form processing.
 *
 * Values can arrive in three places:
 * req.params: named sections of the URL, such as /read/Lynne
 * req.query: query strings, such as ?name=Lynne
 * req.body: data submitted in the request body, such as a POST form
 *
 * These routes return HTML or text. The JSON API will be added
 * separately for Lab 8.2.
 */

var express = require('express');
var router = express.Router();

// The starter uses body-parser to read incoming request bodies.
var bodyParser = require('body-parser');

// Parse JSON bodies and URL-encoded HTML form submissions.
// app.js also configures body parsing before mounting this router.
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render views/index.ejs when the browser requests the homepage.
// The title value is passed to the EJS template.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ReadFormDataSaveMongoDB' });
});

// Read a name from a URL path parameter.
// Example: GET /read/Lynne returns "hello Lynne".
router.get('/read/:name', function(req, res, next) {
  var value_name = req.params.name;

  res.send("hello " + value_name);
});

// Read a name from the URL's query string.
// Example: GET /readNameAndRespond?name=Lynne.
router.get('/readNameAndRespond', function(req, res, next) {
  var value_name = req.query.name;

  res.send("hello " + value_name);
});

// Read a name from a POST request body.
// Although the path matches the GET route above, Express selects
// this handler because the incoming HTTP method is POST.
router.post('/readNameAndRespond', function(req, res, next) {
  var value_name = req.body.name;

  res.send("hello now " + value_name);
});

// Process the traditional customer form's POST submission.
// The body parser makes its name and email fields available in req.body.
// Returning HTML causes a normal form submission to navigate to this response.
router.post('/readCustomerInfoAndRespond', function(req, res, next) {
  var value_name = req.body.name;
  var value_email = req.body.email;

  res.send(
    "Welcome,  " + value_name +
    "</br> We will reach you at: " + value_email
  );
});

// Export the router so app.js can mount these routes.
module.exports = router;