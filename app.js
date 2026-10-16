/*
 * Configures the Express application: middleware, EJS views,
 * routes, static files, and error handling.
 * The HTTP server is started separately in bin/www.
 */

// Import libraries used to configure the application.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routers containing handlers for the application's URLs.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Create the Express application.
var app = express();

// Locate the view templates and use EJS to render them as HTML.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Log incoming HTTP requests to help with debugging.
app.use(logger('dev'));

// Parse JSON request bodies, including JSON sent using fetch().
// Parsed values become available through req.body.
app.use(express.json());

// Parse URL-encoded request bodies from traditional HTML forms.
app.use(express.urlencoded({ extended: false }));

// Parse incoming cookies and make them available through req.cookies.
app.use(cookieParser());

// Serve files such as stylesheets and browser JavaScript from public.
app.use(express.static(path.join(__dirname, 'public')));

// Register routes after the body parsers so handlers can read req.body.
// Each router defines the remaining path and HTTP method to handle.
app.use('/', indexRouter);
app.use('/users', usersRouter);

// If no earlier route responded, forward a 404 error to the error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// Handle errors forwarded by middleware or route handlers.
// Express recognizes error handlers by their four parameters.
app.use(function(err, req, res, next) {
  // Make the message available to the EJS error template.
  res.locals.message = err.message;

  // Show detailed error information only in development.
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Use the error's HTTP status, or 500 for an unexpected server error.
  res.status(err.status || 500);

  // Render views/error.ejs as the response.
  res.render('error');
});

// Export the configured app so bin/www can start the HTTP server.
module.exports = app;