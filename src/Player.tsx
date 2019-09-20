import React from 'react';
import { Card, Icon, Button, Image, Item, Label } from 'semantic-ui-react';
import { sanitizeWeight } from './helpers';

import { PlayerType } from './types';

type PlayerProps = {
  player: PlayerType;
  lastGames: { wins: number; loses: number };
};

export const Player = ({ player, lastGames }: PlayerProps) => {
  return (
    <Item>
      <Item.Image src={player.picture} />
      <Item.Content>
        <Item.Header as="a">
          {`${player.firstname} ${player.lastname}`}
        </Item.Header>
        <Item.Meta>
          <span className="item-meta">
            <Image
              avatar
              circular
              size="mini"
              aria-label="country"
              src={player.country.picture}
            />
            <span className="item-meta-label">{player.country.code}</span>
          </span>
        </Item.Meta>
        <Item.Meta>
          <span className="item-meta">
            <Icon aria-label="rank" name="chart line" />
            <span className="item-meta-label">
              Rank: <strong>{player.data.rank}</strong> -{' '}
              <span className="item-meta-label">
                {player.data.points} Points
              </span>
            </span>
          </span>
        </Item.Meta>
        <Item.Description>
          A description for {`${player.firstname} ${player.lastname}`} which may
          flow for several lines and give context to the content.
        </Item.Description>
        <Item.Extra>
          {player.sex === 'M' ? (
            <span>
              <Icon name="male" fitted aria-label="male" /> Male
            </span>
          ) : (
            <span>
              <Icon name="female" fitted aria-label="female" /> Female
            </span>
          )}
          {/* <span>
              <Flag name={flag} />
              {player.country.code}
            </span> */}
          <span>
            <Icon name="weight" />
            {sanitizeWeight(player.data.weight)}
          </span>
          <span>
            <Icon name="resize vertical" />
            {player.data.height} cm
          </span>
        </Item.Extra>
        <Item.Extra>
          <span>
            Wins: <strong>{lastGames.wins}</strong> Loses:{' '}
            <strong>{lastGames.loses}</strong>
          </span>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default Player;
