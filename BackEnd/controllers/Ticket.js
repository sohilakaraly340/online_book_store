class TicketController {
  constructor(ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async createTicket(body) {
    return await this.ticketRepository.createNewTicket(body);
  }
  async deleteTicketById(id) {
    return await this.ticketRepository.deleteTicket(id);
  }
  async getAllUserTickets(id) {
    return await this.ticketRepository.getAllUserTickets(id);
  }
  async getTicketById(id) {
    return await this.ticketRepository.getTicketById(id);
  }
  async getTicketsByEventId(id) {
    return await this.ticketRepository.getTicketsByEventId(id);
  }
}
module.exports = TicketController;
