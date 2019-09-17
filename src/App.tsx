import React, { useReducer, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Card,
  Icon,
  Button,
  Dimmer,
  Loader,
  Flag,
  Image,
  Header,
  Item,
  Container,
  Label
} from "semantic-ui-react";
import "./App.css";
import { State, Actions } from "./types";
import { setFlag, formatWeigth } from "./helpers";

export const API =
  "https://eurosportdigital.github.io/eurosport-web-developer-recruitment/headtohead.json";

export const dataFetchReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "FETCH_INIT":
      console.log("FETCH_INIT", {
        ...state,
        isLoading: true,
        isError: false
      });
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const initialData: State = {
  data: [],
  isError: false,
  isLoading: false
};

export const App: React.FC = () => {
  const [{ data, isError, isLoading }, dispatch] = useReducer(
    dataFetchReducer,
    initialData
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      console.log("fetchinit");
      try {
        const result = await axios(API);
        console.log("result", result.data.players);
        setTimeout(() => {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data.players });
        }, 2000);
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    fetchData();
  }, []);

  const style = {
    h1: {
      margin: "3em 0"
    }
  };

  return (
    <div>
      <Header as="h1" content="Eurosport" style={style.h1} textAlign="center" />

      {/* <Container> */}
      {/* <Item.Group divided>
          <Item>
            <Item.Image src="/images/wireframe/image.png" />
            <Item.Content>
              <Item.Header as="a">Content Header</Item.Header>
              <Item.Meta>
                <span>Date</span>
                <span>Category</span>
              </Item.Meta>
              <Item.Description>
                A description which may flow for several lines and give context
                to the content.
              </Item.Description>
              <Item.Extra>
                <Image
                  avatar
                  circular
                  src="/images/wireframe/square-image.png"
                />
                Username
              </Item.Extra>
            </Item.Content>
          </Item>

          <Item>
            <Item.Image src="/images/wireframe/image.png" />
            <Item.Content>
              <Item.Header as="a">Content Header</Item.Header>
              <Item.Meta>
                <span>Date</span>
                <span>Category</span>
              </Item.Meta>
              <Item.Description>
                A description which may flow for several lines and give context
                to the content.
              </Item.Description>
              <Item.Extra>
                <Button floated="right" primary>
                  Primary
                  <Icon name="chevron right" />
                </Button>
                <Label>Limited</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container> */}

      <Container>
        {isError && <h1>Something went wrong ...</h1>}
        {/* <div>test {setFlag("esp")}</div> */}
        {isLoading ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          // <Card.Group>
          <Item.Group divided>
            {data.map(player => {
              const extra = (
                <Fragment>
                  <Icon name="user" />
                  16 Friends
                  <Icon name="user" />
                  16 Friends
                  <Icon name="user" />
                  16 Friends
                  <Icon name="user" />
                  16 Friends
                </Fragment>
              );
              const flag = setFlag(player.country.code);
              console.log("flag", flag);
              return (
                // <Card
                //   key={`${player.firstname}-${player.lastname}`}
                //   image={player.picture}
                //   header={player.shortname}
                //   meta="Friend"
                //   description={`${player.firstname}-${player.lastname}`}
                //   extra={extra}
                // />

                <Item>
                  <Item.Image src={player.picture} />
                  <Item.Content>
                    <Item.Header as="a">
                      {`${player.firstname} ${player.lastname}`}{" "}
                    </Item.Header>
                    <Item.Meta>
                      <span>
                        <Image avatar circular src={player.country.picture} />
                        <span>{player.country.code}</span>
                      </span>
                      <span>
                        <Icon size="large" name="trophy" /> {player.data.points}
                      </span>
                    </Item.Meta>
                    <Item.Description>
                      A description which may flow for several lines and give
                      context to the content.
                    </Item.Description>
                    <Item.Extra>
                      <span>
                        {player.sex === "M" ? (
                          <Icon name="male" aria-label="male" />
                        ) : (
                          <Icon name="female" />
                        )}
                      </span>
                      {/* <span>
                        <Flag name={flag} />
                        {player.country.code}
                      </span> */}
                      <span>
                        <Icon name="weight" />
                        {formatWeigth(player.data.weight)}
                      </span>
                      <span>
                        <Icon name="resize vertical" />
                        {player.data.height} cm
                      </span>
                    </Item.Extra>
                    <Item.Extra />
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>
          // </Card.Group>
        )}
      </Container>
    </div>
  );
};

export default App;
