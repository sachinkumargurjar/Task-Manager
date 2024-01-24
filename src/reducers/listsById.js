import {
  ADD_LIST,
  DELETE_LIST,
  CHANGE_LIST_TITLE,
  ADD_CARD,
  MOVE_CARD,
  DELETE_CARD,
} from "../constants/actionTypes";

const lists = {
  "MOnlydEu1": {
      "_id": "MOnlydEu1",
      "title": "Frontend Tasks",
      "cards": [
          "HV6ELJCdb",
          "aZknVXc65",
          "bJFlEQmQU",
          "Ats-KqPZq"
      ]
  },
  "m8ZS-7M7Y": {
      "_id": "m8ZS-7M7Y",
      "title": "Backend Tasks",
      "cards": [
          "Bo152RNqW",
          "w9xre0JUb"
      ]
  },
  "ie7IhZ8hz": {
      "_id": "ie7IhZ8hz",
      "title": "Database Tasks",
      "cards": [
          "GA3raS64O",
          "SW4wSgrbW"
      ]
  },
  "3V3CI2jdf": {
      "_id": "3V3CI2jdf",
      "title": "Full Stack Tasks",
      "cards": [
          "SCQj1gx20"
      ]
  }
};

const listsById = (state = lists, action) => {
  console.log(state);
  switch (action.type) {
    case ADD_LIST: {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] },
      };
    }
    case CHANGE_LIST_TITLE: {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle },
      };
    }
    case DELETE_LIST: {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case ADD_CARD: {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
      };
    }
    case MOVE_CARD: {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } =
        action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    }
    case DELETE_CARD: {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = (cardId) => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(filterDeleted),
        },
      };
    }
    default:
      return state;
  }
};

export default listsById;
