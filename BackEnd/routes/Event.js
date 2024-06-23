const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const paginate = require("../middlewares/Pagination");
const router = express.Router();
const event = require("../models/Event");
const eventRouter = (eventController) => {
  router.get(
    "/",
    paginate(event),
    handleAsync(async (req, res) => {
      const events = await eventController.getAllEvents();

      res.status(200).json({ success: true, data: req.paginatedResult });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const event = await eventController.getEventById(req.params.id);
      res.status(200).json({ success: true, data: event });
    })
  );

  return router;
};

module.exports = eventRouter;
