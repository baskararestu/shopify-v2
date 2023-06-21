require("dotenv").config({
  path: ".env.local",
});
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const {
  userRoutes,
  cartRoutes,
  adminRoutes,
  warehouseRoutes,
  rajaOngkirRoutes,
  orderRoutes,
} = require("../routers/");
const { db, query } = require("../database");
const { categoryRoutes } = require("../routers");
const { productRoutes } = require("../routers");
const { userProfileRoutes } = require("../routers");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: process.env.WHITELISTED_DOMAIN,
    credentials: true,
  })
);

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/users", userRoutes);
app.use("/user_profile", userProfileRoutes);
app.use("/product_categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/admins", adminRoutes);
app.use("/warehouses", warehouseRoutes);
app.use("/orders", orderRoutes);
app.use("/rajaongkir", rajaOngkirRoutes); // Add the rajaOngkirRoutes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
