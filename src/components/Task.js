import "../styles/Task.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import TaskEditor from "./TaskEditor";
import {CardMedia, Typography } from "@material-ui/core/";

const Task = ({ cardId, index, listId }) => {
  console.log(cardId);
  const dispatch = useDispatch();
  const card = useSelector((state) => (state.cardsById[cardId]));
  console.log(card);
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const startEditing = () => {
    setHover(false);
    setEditing(true);
  };

  const endEditing = () => setEditing(false);

  const editCard = async (text, media) => {
    endEditing();
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card?._id, cardText: text, media: media },
    });
  };

  const deleteCard = async () => {
    if (window.confirm("Are you sure to delete this task?")) {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card?._id, listId },
      });
    }
  };

  if (!editing) {
    return (
      <Draggable draggableId={card?._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            <Typography gutterBottom variant="h5" component="h4">
                {card?.text}
              </Typography>
              {card?.media && (
                <CardMedia
                  component="img"
                  alt="Card Media"
                  height="100"
                  image={card?.media}
                />
              )}
            {hover && (
              <div className="Card-Icons">
                <div className="Card-Icon" onClick={startEditing}>
                  <ion-icon name="create" />
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <TaskEditor
        file = {card?.media}
        text={card.text}
        onSave={editCard}
        onDelete={deleteCard}
        onCancel={endEditing}
      />
    );
  }
};

// const mapStateToProps = (state, ownProps) => ({
//   card: state.cardsById[ownProps.cardId],
// });

// export default connect(mapStateToProps)(Task);
export default Task;

