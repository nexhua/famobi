interface GameProgress {
  fails: number;
  gameId: string;
  playTime: number;
  wins: number;
}

const progressList: {[key: string]: GameProgress} = {
  'archery-mission-lvl': {
    fails: 9,
    gameId: 'archery-world-tour',
    playTime: 5291.706,
    wins: 8,
  },
  'archery-world-mission-1': {
    fails: 9,
    gameId: 'archery-world-tour',
    playTime: 981,
    wins: 6,
  },
  'bubble-woods-mission-1': {
    fails: 19,
    gameId: 'bubble-woods',
    playTime: 1206,
    wins: 9,
  },
  'bubble-woods-mission-lvl': {
    fails: 1,
    gameId: 'bubble-woods',
    playTime: 100,
    wins: 2,
  },
  'candy-bubble-mission-lvl': {
    fails: 6,
    gameId: 'candy-bubble',
    playTime: 1558,
    wins: 6,
  },
};

export function solve(): void {
  // Get GameProgress objects from Key-Value pairs
  const gameProgresses = Object.keys(progressList).map(
    key => progressList[key],
  );

  // Find each unique game id
  const uniqueGameIds = [...new Set(gameProgresses.map(game => game.gameId))];

  // Group gameProgress list by unique game ids
  const gameGroups = groupBy(gameProgresses, game => game.gameId);

  const result: GameProgress[] = [];

  // For each gameId and gameProgress[] mapping, reduce gameProgress to single object
  uniqueGameIds.forEach(gameId => {
    const progresses = gameGroups.get(gameId);

    if (progresses != undefined) {
      result.push(summariseGame(gameId, progresses));
    }
  });

  console.log(result);
}

function groupBy<T>(
  list: T[],
  keyGetter: (item: T) => string,
): Map<string, [T]> {
  const map = new Map<string, [T]>();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (collection === undefined) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function summariseGame(
  gameId: string,
  gameProgresses: GameProgress[],
): GameProgress {
  const progresses: GameProgress = {
    fails: 0,
    gameId: gameId,
    playTime: 0,
    wins: 0,
  };

  gameProgresses.forEach(g => {
    progresses.fails += g.fails;
    progresses.playTime += g.playTime;
    progresses.wins += g.wins;
  });

  return progresses;
}
