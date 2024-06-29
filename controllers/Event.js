const { ValidationError } = require("../Errors/validationError");
const validator = require("../validators/Event");

class EventController {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }

  async createEvent(body) {
    const { error } = validator.validateEvent(body);
    if (error) {
      throw new ValidationError(`In valid data ${error.message}`);
    }

    return await this.eventRepository.createNewEvent(body);
  }

  async getAllEvents() {
    return await this.eventRepository.getAllEvents();
  }

  async getEventById(id) {
    return await this.eventRepository.getEventById(id);
  }

  async updateEvent(id, body) {
    return await this.eventRepository.updateEvent(id, body);
  }

  async deleteEventById(id) {
    return await this.eventRepository.deleteEventById(id);
  }
}
module.exports = EventController;
