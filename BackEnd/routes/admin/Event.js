const express = require("express");
const { handleAsync } = require("../../Errors/HandleAsync");
const { admin } = require("../../middlewares/Admin");
const { uploadImage } = require("../../middlewares/firebase");
const { uploadSingle } = require("../../middlewares/Multer");
const router = express.Router();

const eventRouter = (eventController) => {
  router.post(
    "/",
    uploadSingle,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const newEvent = await eventController.createEvent(req.body);
      res.status(201).json({ success: true, data: newEvent });
    })
  );

  router.patch(
    "/:id",
    uploadSingle,
    uploadImage,
    admin,
    handleAsync(async (req, res) => {
      const updated = await eventController.updateEvent(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: updated });
    })
  );
  router.delete(
    "/:id",
    admin,
    handleAsync(async (req, res) => {
      await eventController.deleteEventById(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "event deleted successfully" });
    })
  );

  return router;
};

module.exports = eventRouter;
