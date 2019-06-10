require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

//connect to database
// require('./database/db');

const employeesRouter = require('./routes/employees');
const authRouter = require('./routes/auth');
const permisisonRouter = require('./routes/permissions');
const departmentRouter = require('./routes/departments');
const projectRouter = require('./routes/projects');
const roleRouter = require('./routes/roles');
const sprintRouter = require('./routes/sprints');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/employees', employeesRouter);
app.use('/api/auth', authRouter);
app.use('/api/permissions', permisisonRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/projects', projectRouter);
app.use('/api/roles', roleRouter);
app.use('/api/sprints', sprintRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
