const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from .env or default to 3000
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/chat", chatRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("error", err));

// Start server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
