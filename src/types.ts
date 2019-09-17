type Player = {
  firstname: string;
  lastname: string;
  shortname: string;
  sex: string;
  country: {
    picture: string;
    code: string;
  };
  picture: string;
  data: {
    rank: number;
    points: number;
    weight: number;
    height: number;
    age: number;
    last: number[];
  };
};

export type State = {
  data: Player[];
  isLoading: boolean;
  isError: boolean | null;
};

export type Actions =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_ERROR" }
  | {
      type: "FETCH_SUCCESS";
      payload: Player[];
    };
