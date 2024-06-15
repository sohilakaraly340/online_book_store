const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const router = express.Router();

const eventRouter = (eventController) => {
  router.get(
    "/",
    handleAsync(async (req, res) => {
      const events = await eventController.getAllEvents();

      res.status(200).json({ success: true, data: events });
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
