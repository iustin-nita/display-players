export const setFlag = (code: string): string =>
  code.slice(0, -1).toLowerCase();

export const sanitizeWeight = (weight: number): string => weight / 1000 + ' kg';

export const sanitizeLastGames = (
  lastGames: number[]
): { wins: number; loses: number } => {
  const sanitizedLastGames = {
    wins: 0,
    loses: 0,
  };
  lastGames.map(game =>
    game ? sanitizedLastGames.wins++ : sanitizedLastGames.loses++
  );
  console.log('sanitizedLastGames', sanitizedLastGames);
  return sanitizedLastGames;
};
