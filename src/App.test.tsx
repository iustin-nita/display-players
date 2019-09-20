import React from 'react';
import renderer from 'react-test-renderer';
import { Item } from 'semantic-ui-react';
import Enzyme, { configure, shallow, mount } from 'enzyme';
import axios from 'axios';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import App, { dataFetchReducer } from './App';
import Player from './Player';
import { fakePlayer, fakeLastGames, fakeState } from './mockData';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  describe('Reducer', () => {
    it('should set isLoading when starting to fetch', () => {
      const state = fakeState;
      const newState = dataFetchReducer(state, {
        type: 'FETCH_INIT',
      });
      expect(newState).toEqual({ ...state, isLoading: true });
    });

    it('should reset the error when starting to fetch', () => {
      const state = { ...fakeState, isError: true };
      const newState = dataFetchReducer(state, {
        type: 'FETCH_INIT',
      });
      expect(newState).toEqual({
        ...state,
        isLoading: true,
        isError: false,
      });
    });
    it('should reset the error/loading if fetch is sucessful', () => {
      const state = { ...fakeState, isError: true };
      const newState = dataFetchReducer(state, {
        type: 'FETCH_SUCCESS',
        payload: [fakePlayer],
      });
      expect(newState).toEqual({
        data: [fakePlayer],
        isLoading: false,
        isError: false,
      });
    });
    it('should set the error when fetch fails', () => {
      const state = fakeState;
      const newState = dataFetchReducer(state, {
        type: 'FETCH_ERROR',
      });
      expect(newState.isError).toBeTruthy();
    });
  });

  it('fetches async data and renders the inner Player Component', async done => {
    const promise = new Promise((resolve, reject) =>
      setTimeout(
        () =>
          resolve({
            data: [fakePlayer],
          }),
        100
      )
    );

    mockedAxios.get = jest.fn(() => promise);

    const wrapper = mount(<App />);
    expect(wrapper.find(Item).length).toEqual(0);
    // await mockedAxios.get.mockResolvedValue({ data: [fakePlayer] });
    promise.then(() => {
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find(Item).length).toEqual(1);
        mockedAxios.get.mockClear();
        done();
      });
    });
  });

  it('fetches async data but fails', done => {
    const promise = new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Nope !')), 100)
    );
    mockedAxios.get = jest.fn(() => promise);
    const wrapper = mount(<App />);
    promise.catch(() => {
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find(Item).length).toEqual(0);
        expect(wrapper.find('.error-message').length).toEqual(1);
        mockedAxios.get.mockClear();
        done();
      });
    });
  });

  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Player', () => {
  test('snapshot renders', () => {
    const component = renderer.create(
      <Player player={fakePlayer} lastGames={fakeLastGames} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
