/* eslint-disable require-jsdoc */
const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this.pool = new Pool();
  }

  async getSongsPlaylist(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const result = await this.pool.query(query);

    const query2 = {
      text: `SELECT s.id,s.title,s.performer FROM playlist_song ps
              LEFT JOIN songs s ON s.id = ps.song_id
              WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };
    const result2 = await this.pool.query(query2);

    return { playlist: { ...result.rows[0], songs: result2.rows } };
  }
}

module.exports = PlaylistService;
