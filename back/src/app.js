const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const config = require("../config/server");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Route files
const memorials = require("./domains/memorials/routes/memorialRoutes");
const users = require("./domains/users/routes/userRoutes");
const articles = require("./domains/articles/routes/articleRoutes");
const books = require("./domains/books/routes/bookRoutes");
const contactUs = require("./domains/contactus/routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "../../public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routers
app.use("/api/memorials", memorials);
app.use("/api/users", users);
app.use("/api/articles", articles);
app.use("/api/books", books);
app.use('/api/contactus', contactUs);

// Error handling middleware
app.use((err, req, res, next) => {
  //console.error(err.stack);
  console.log("Error:", err);
  res.status(500).json({
    success: false,
    //error: "Server Error",
    error:
      process.env.NODE_ENV === "development" && err.message
        ? err.message
        : "server error",
    details: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

module.exports = app;
