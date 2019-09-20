export const fakePlayer = {
  firstname: 'Stan',
  lastname: 'Wawrinka',
  shortname: 'S.WAW',
  sex: 'M',
  country: {
    picture: 'https://i.eurosport.com/_iss_/geo/country/flag/large/2213.png',
    code: 'SUI'
  },
  picture: 'https://i.eurosport.com/_iss_/person/pp_clubteam/large/325225.jpg',
  data: {
    rank: 21,
    points: 1784,
    weight: 81000,
    height: 183,
    age: 33,
    last: [1, 1, 1, 0, 1]
  }
};

export const fakeLastGames = { wins: 3, loses: 2 };

export const fakeState = {
  data: fakePlayer,
  isLoading: false,
  isError: false
};
