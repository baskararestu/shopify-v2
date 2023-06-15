const express = require("express");
const { userProfileController } = require("../controllers");
const { verifyToken } = require("../middleware/authVerification");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadz = require("../middleware/multer");

router.get("/", verifyToken, userProfileController.getUserProfile);
router.post("/edit-data", verifyToken, userProfileController.editUserProfile);
router.post("/upload", verifyToken, uploadz.single("file"), userProfileController.uploadProfilePicture);
router.post("/add-address", verifyToken, userProfileController.addAddress);
router.post("/edit-address/:id", verifyToken, userProfileController.editAddress);
router.delete("/delete-address/:id", verifyToken, userProfileController.deleteAddress);

module.exports = router;