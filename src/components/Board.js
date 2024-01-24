import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import TaskEditor from "./TaskEditor";
import BoardEditor from "./BoardEditor";
import shortid from "shortid";
import "../styles/Board.css";

const Board = ({listId, index}) => {
  const dispatch = useDispatch();
  console.log(listId);
  // const list = useSelector((state) => console.log(state.listsById.lists[listId]));

  const list = useSelector((state) => state.listsById[listId]);
  console.log(list);
  const [editTitle, seteditTitle] = useState(false);
  const [title, setTitle] = useState(list?.title);
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setAddingCard(!addingCard);

  const addCard = async (cardText,media) => {
    const cardId = shortid.generate();
    dispatch({
      type: "ADD_CARD",
      payload: { cardText:cardText, cardId, listId: list._id,media:media },
    });
    toggleAddingCard();
  };
// 
  const toggleeditTitle = () => seteditTitle(!editTitle);

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const editListTitle = async () => {
    toggleeditTitle();

    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId: list._id, listTitle: title },
    });

  };

  const deleteList = async () => {
    if (window.confirm("Are you sure to delete this list?")) {
      dispatch({
        type: "DELETE_LIST",
        payload: { listId: list._id, cards: list.cards },
      });
    }
  };

  return (
    <Draggable draggableId={list?._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editTitle ? (
            <BoardEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className="List-Title" onClick={toggleeditTitle}>
              {list?.title}
            </div>
          )}

          <Droppable droppableId={list?._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="Lists-Cards">
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Task key={cardId} cardId={cardId} index={index} listId={list._id} />
                  ))}

                {provided.placeholder}

                {addingCard ? (
                  <TaskEditor onSave={addCard} onCancel={toggleAddingCard} adding />
                ) : (
                  <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                    <ion-icon name="add" /> Add a Task
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Board;

