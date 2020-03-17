import _ from "lodash";

const initialState = {
  cards: [],
  selectedCardIds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_CARD":
      return {
        ...state,
        cards: action.cards
      };
    case "SELECT_CARD":
      return {
        ...state,
        selectedCardIds: [..._.get(state, "selectedCardIds", []), action.cardId]
      };
    case "REMOVE_CARD":
      return {
        ...state,
        selectedCardIds: _.filter(
          _.get(state, "selectedCardIds", []),
          selectedCardId => selectedCardId !== action.cardId
        )
      };
    default:
      return state;
  }
};
