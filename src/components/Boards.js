import "../styles/Boards.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddIcon from '@mui/icons-material/Add';
import Board from "./Board";
import AddBoard from "./AddBoard";

const TaskBoards  = () => {
  const dispatch = useDispatch();
  const board = useSelector(state =>  state.board);
  console.log(board);
  const [addingList, setAddingList] = useState(false);
  const toggleAddingList = () => setAddingList(!addingList);

  const handleDragEnd = ({ source, destination, type }) => {
    if (!destination) return;

    // Move list
    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
          },
        });
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided, _snapshot) => (
          <div className="TaskBoard" ref={provided.innerRef} style={{ display: 'flex'}} >
            <div className="Add-Task-Board">
              {addingList ? (
                <AddBoard toggleAddingList={toggleAddingList} />
              ) : (
                <div onClick={toggleAddingList} className="Add-Task-Button">
                  <AddIcon name="add"/> Add a Task Board
                </div>
              )}
            </div>
            {board?.lists?.map((listId, index) => (
              <Board listId={listId} key={listId} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskBoards;