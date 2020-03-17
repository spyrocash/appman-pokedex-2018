import React, { useEffect, useState } from "react";
import _ from "lodash";
import Modal from "react-modal";
import { Provider, useSelector, useDispatch } from "react-redux";

import configureStore from "./store/configureStore";
import { Card } from "./components";
import { fetchCards } from "./services";

import iconSearch from "./search.png";

import "./App.scss";

const store = configureStore();

function App(props) {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { cards, selectedCardIds } = useSelector(state => {
    return {
      cards: state.cards,
      selectedCardIds: state.selectedCardIds
    };
  });

  const selectedCards = _.filter(cards, card => {
    return _.includes(selectedCardIds, card.id);
  });

  let unselectedCards = _.filter(cards, card => {
    return !_.includes(selectedCardIds, card.id);
  });

  if (searchText) {
    unselectedCards = _.filter(unselectedCards, card => {
      const searchTextLower = _.toLower(searchText);
      return (
        _.toLower(card.name).includes(searchTextLower) ||
        _.toLower(card.supertype).includes(searchTextLower) ||
        _.toLower(card.subtype).includes(searchTextLower)
      );
    });
  }

  useEffect(() => {
    const getCards = async () => {
      const fetchCardsResult = await fetchCards();
      const cards = _.get(fetchCardsResult, "cards");
      dispatch({
        type: "RECEIVE_CARD",
        cards
      });
    };

    const init = () => {
      Modal.setAppElement(".App");
      getCards();
    };

    init();
  }, [dispatch]);

  const getCardDetail = card => {
    const id = _.get(card, "id");
    const image = _.get(card, "imageUrl");
    const name = _.get(card, "name");
    let hp = _.toInteger(_.get(card, "hp", 0));
    hp = hp > 100 ? 100 : hp;
    const attacks = _.get(card, "attacks");
    let str = _.size(attacks) * 50;
    str = str > 100 ? 100 : str;
    const weaknesses = _.get(card, "weaknesses");
    let weakness = _.size(weaknesses) * 100;
    weakness = weakness > 100 ? 100 : weakness;
    const damage = _.sumBy(attacks, attack => {
      const dmg = _.get(attack, "damage", 0);
      return _.toInteger(dmg.replace(/\D/g, ""));
    });
    const happiness = (hp / 10 + damage / 10 + 10 - weakness / 100) / 5;
    return {
      id,
      image,
      name,
      hp,
      str,
      weakness,
      happiness
    };
  };

  return (
    <div className="App">
      <div className="topic">
        <h1>My Pokedex</h1>
      </div>
      <div className="container-card-list">
        {_.map(selectedCards, card => {
          const {
            id,
            image,
            name,
            hp,
            str,
            weakness,
            happiness
          } = getCardDetail(card);
          return (
            <div key={id} className="container-card">
              <Card
                image={image}
                name={name}
                hp={hp}
                str={str}
                weakness={weakness}
                happiness={happiness}
              />
              <div
                className="remove-block"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_CARD",
                    cardId: id
                  });
                }}
              >
                X
              </div>
            </div>
          );
        })}
      </div>
      <div className="bottom-bar">
        <div className="add-button" onClick={() => setShowModal(true)}>
          +
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: 900
          }
        }}
      >
        <div className="popup-modal">
          <div className="search-block">
            <div className="search">
              <input
                type="text"
                onChange={e => {
                  const value = e.target.value;
                  setSearchText(value);
                }}
              />
              <div className="icon">
                <img src={iconSearch} alt="" />
              </div>
            </div>
          </div>
          <div className="card-list-block">
            {_.map(unselectedCards, card => {
              const {
                id,
                image,
                name,
                hp,
                str,
                weakness,
                happiness
              } = getCardDetail(card);
              return (
                <div key={id} className="card-block">
                  <Card
                    image={image}
                    name={name}
                    hp={hp}
                    str={str}
                    weakness={weakness}
                    happiness={happiness}
                  />
                  <div
                    className="add-block"
                    onClick={() => {
                      dispatch({
                        type: "SELECT_CARD",
                        cardId: id
                      });
                    }}
                  >
                    Add
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default () => {
  return (
    <Provider store={store} key="provider">
      <App />
    </Provider>
  );
};
