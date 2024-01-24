import {
  ADD_LIST,
  MOVE_LIST,
  DELETE_LIST,
} from "../constants/actionTypes";

const val = ['MOnlydEu1', 'm8ZS-7M7Y', 'ie7IhZ8hz','3V3CI2jdf'];

const board = (state = {lists: val} , action) => {
  // console.log(state);
  switch (action.type) {
    case ADD_LIST: {
      const { listId } = action.payload;
      // console.log({ lists: [...state.lists, listId] });
      console.log(state);
      return { lists: [...state.lists, listId] };
    }
    case MOVE_LIST: {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return { lists: newLists };
    }
    case DELETE_LIST: {
      const { listId } = action.payload;
      const filterDeleted = tmpListId => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    }
    default:
      return state;
  }
};

export default board