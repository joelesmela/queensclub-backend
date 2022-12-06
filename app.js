require("./database/database");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const CronJob = require("cron").CronJob;

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const queenRouter = require("./routes/queen");
const galleriesRouter = require("./routes/galleries");
const carouselRouter = require("./routes/carousel");
const purchaseRouter = require("./routes/purchase");
const routesMercadoPago = require("./routes/mercadoPago");
const jwtRouter = require('./routes/jwtRouter');
const { ubdateSuscriptcion } = require("./util/cronUpdate");

const app = express();
const cron = new CronJob(process.env.CRON_TIME, ubdateSuscriptcion);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

cron.start();

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/queen", queenRouter);
app.use("/galleries", galleriesRouter);
app.use("/carousel", carouselRouter);
app.use("/purchase", purchaseRouter);
app.use("/mercadopago", routesMercadoPago);
app.use("/jwt", jwtRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});




module.exports = app;
