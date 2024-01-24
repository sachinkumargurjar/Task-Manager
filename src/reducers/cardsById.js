import {
    DELETE_LIST,
    ADD_CARD,
    CHANGE_CARD_TEXT,
    DELETE_CARD
  } from "../constants/actionTypes";

  const cards = {
    "aZknVXc65": {
        "text": "This is the task related to Figma",
        "_id": "aZknVXc65",
        "media": ""
    },
    "Bo152RNqW": {
        "text": "Schema change",
        "_id": "Bo152RNqW",
        "media": ""
    },
    "GA3raS64O": {
        "text": "Match the schema with the 3rd party api",
        "_id": "GA3raS64O",
        "media": ""
    },
    "SW4wSgrbW": {
        "text": "Different relations",
        "_id": "SW4wSgrbW",
        "media": ""
    },
    "bJFlEQmQU": {
        "text": "Change the ui of the front page",
        "_id": "bJFlEQmQU",
        "media": ""
    },
    "Ats-KqPZq": {
        "text": "UI/UX",
        "_id": "Ats-KqPZq",
        "media": ""
    },
    "HV6ELJCdb": {
        "text": "Teaching Frontend",
        "_id": "HV6ELJCdb",
    },
    "w9xre0JUb": {
        "text": "Ba ckend logic",
        "_id": "w9xre0JUb",
        "media": ""
    },
    "SCQj1gx20": {
        "text": "This is new task related to full stack",
        "_id": "SCQj1gx20",
        "media": ""
    }
};

const cardsById = (state = cards, action) => {
    switch (action.type) {
      case ADD_CARD: {
        const { cardText, cardId, media } = action.payload;
        return { ...state, [cardId]: { text: cardText, _id: cardId, media:media } };
      }
      case CHANGE_CARD_TEXT: {
        const { cardText, cardId,media } = action.payload;
        return { ...state, [cardId]: { ...state[cardId], text: cardText, media:media} };
      }
      case DELETE_CARD: {
        const { cardId } = action.payload;
        const { [cardId]: deletedCard, ...restOfCards } = state;
        return restOfCards;
      }
      case DELETE_LIST: {
        const { cards: cardIds } = action.payload;
        return Object.keys(state)
          .filter(cardId => !cardIds.includes(cardId))
          .reduce(
            (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
            {}
          );
      }
      default:
        return state;
    }
  };

  export default cardsById