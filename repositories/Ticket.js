const { NotFoundError } = require("../Errors/notFoundError");
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { BadRequestError } = require("../Errors/BadRequestError");

class TicketRepository {
  async createNewTicket(body) {
    const event = await Event.findById(body.event);
    if (!event) throw new NotFoundError("Event not found!");

    if (event.users.length == event.numOfAttendees)
      throw new NotFoundError("Tickets are sold out!");

    if (event.users.includes(body.user)) {
      throw new BadRequestError("You already have a ticket for this event!");
    }

    const newTicket = await (await Ticket.create(body)).populate("event");

    event.users.push(body.user);
    event.numOfTickets--;
    await event.save();
    return newTicket;
  }

  async deleteTicket(id) {
    const ticket = await Ticket.findById(id);
    if (!ticket) throw new NotFoundError("Ticket not found!");

    const event = await Event.findById(ticket.event);
    event.users = event.users.filter((user) => user == ticket.user);

    event.numOfTickets++;
    await event.save();

    await Ticket.deleteOne({ _id: id });
  }

  async getAllUserTickets(userId) {
    return await Ticket.find({ user: userId }).populate("event");
  }

  async getTicketById(id) {
    return await Ticket.findById({ _id: id })
      .populate("event")
      .populate("user");
  }

  async getTicketsByEventId(id) {
    return await Ticket.find({ event: id }).populate("event").populate("user");
  }
}

module.exports = TicketRepository;
