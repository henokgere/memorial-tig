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
// const tributes = require('./domains/tributes/routes/tributeRoutes');

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
// app.use('/api/tributes', tributes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Server Error",
  });
});

module.exports = app;
