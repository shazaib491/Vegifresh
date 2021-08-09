const express = require("express");
const app = express();
const path = require("path");
const authRoute = require("./routes/authRoute");
const headerRoute = require("./routes/headerRoute");
const logoRoute = require("./routes/logoRoute");
const slideRoute = require("./routes/slideRoute");
const CategoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const cartsRoute = require("./routes/cartsRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const bankRoute = require("./routes/bankRoute");
const blogsRoute = require("./routes/blogsRoute");
const historyRoute = require("./routes/historyRoute");

const front = require("./frontRoute/frontRoute")
const fauthRoute = require("./frontRoute/userRoute");
const http = require("http");


const mongo = require("./db/connect")
const cors = require("cors");
app.use(express.json());
app.use(cors());


// backend middlewares Routes
app.use("/images", express.static(path.join("../Backend/images")));
app.use("/auth", authRoute);
app.use("/header", headerRoute);
app.use("/logo", logoRoute);
app.use("/slides", slideRoute);
app.use("/category", CategoryRoute);
app.use("/products", productRoute);
app.use("/carts", cartsRoute);
app.use("/wishlist", wishlistRoute);
app.use("/bank", bankRoute);
app.use("/blogs", blogsRoute);
app.use("/booking", historyRoute);
// backend  middlewares Routes


// frontend  middlewares Routes
app.use("/front", front);
app.use("/f_auth", fauthRoute);
// frontend  middlewares Routes




const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);




app.listen(3000, () => {
  console.log("server is running");
});
