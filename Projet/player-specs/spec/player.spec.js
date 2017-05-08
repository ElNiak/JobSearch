import { Player } from '../domain/player';
import { Song } from '../domain/song';

describe('Player', () => {
  let player;
  let song;

  beforeEach(() => {
    player = new Player();
    song = new Song();
  });

  it('should be able to play a Song', () => {
    player.play(song);
    expect(player).toBePlaying(song); // demonstrates use of custom matcher
  });

  describe('when song has been paused', () => {
    beforeEach(() => {
      player.play(song);
      player.pause();
    });

    it('should indicate that the song is currently paused', () => {
      expect(player.isPlaying).toBeFalsy();
      expect(player).not.toBePlaying(song); // demonstrates use of 'not' with a custom matcher
    });

    it('should be possible to resume', () => {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it('tells the current song if the user has made it a favorite', () => {
    spyOn(song, 'persistFavoriteStatus');
    player.play(song);
    player.makeFavorite();
    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  // demonstrates use of expected exceptions
  describe('#resume', function () {
    it('should throw an exception if song is already playing', () => {
      player.play(song);
      expect(() => player.resume()).toThrowError('song is already playing');
    });
  });

});
