/* eslint-disable require-jsdoc */
class Listener {
  constructor(playlistervice, mailSender) {
    this.playlistervice = playlistervice;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const notes = await this.playlistervice.getSongsPlaylist(playlistId);
      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
