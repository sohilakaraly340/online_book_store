const { NotFoundError } = require("../Errors/NotFoundError");
const { deleteImages } = require("../middlewares/firebase");
const Event = require("../models/Event");

class EventRepository {
  async getAllEvents() {
    const event = await Event.find();
    if (!event) throw new NotFoundError("Not found event!");

    return event;
  }

  async createNewEvent(body) {
    const newEvent = await Event.create(body);
    return newEvent;
  }

  async getEventById(id) {
    const event = await Event.findOne({ _id: id });
    if (!event) throw new NotFoundError("event not found!");
    return event;
  }

  async updateEvent(id, body) {
    const event = await Event.findById(id);
    if (!event) throw new NotFoundError("event not Found!");
    if (body.images) {
      await deleteImages(event.images);
    }

    const updated = await event.updateOne({ _id: id }, body);

    return updated;
  }

  async deleteEventById(id) {
    const event = await Event.findById(id);
    if (!event) throw new NotFoundError("event not Found!");
    await deleteImages(event.images);

    const deleted = await Event.findByIdAndDelete(id);
    return deleted;
  }
}
module.exports = EventRepository;
