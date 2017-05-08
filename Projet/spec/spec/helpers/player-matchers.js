beforeEach(() => {
  jasmine.addMatchers({

    toBePlaying: () => ({
      compare: (player, expected) => ({
        pass: player.currentlyPlayingSong === expected && player.isPlaying
      })
    })
    
  });
});
