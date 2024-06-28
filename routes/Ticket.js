const express = require("express");
const { handleAsync } = require("../Errors/HandleAsync");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

const ticketRouter = (ticketController) => {
  router.post(
    "/",
    handleAsync(async (req, res) => {
      const newTicket = await ticketController.createTicket(req.body);
      res.status(201).json({ success: true, data: newTicket });
    })
  );

  router.delete(
    "/:id",
    handleAsync(async (req, res) => {
      await ticketController.deleteTicketById(req.params.id);
      res
        .status(200)
        .json({ success: true, data: "Ticket deleted successfully" });
    })
  );

  router.get(
    "/user",
    auth,
    handleAsync(async (req, res) => {
      const tickets = await ticketController.getAllUserTickets(req.auth);
      res.status(200).json({ success: true, data: tickets });
    })
  );

  router.get(
    "/:id",
    handleAsync(async (req, res) => {
      const ticket = await ticketController.getTicketById(req.params.id);
      res.status(200).json({ success: true, data: ticket });
    })
  );

  router.get(
    "/event/:id",
    handleAsync(async (req, res) => {
      const tickets = await ticketController.getTicketsByEventId(req.params.id);
      res.status(200).json({ success: true, data: tickets });
    })
  );

  return router;
};

module.exports = ticketRouter;
