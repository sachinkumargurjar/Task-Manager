import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "../styles/BoardEditor.css";

const BoardEditor = ({ title, handleChangeTitle, deleteList, onClickOutside }) => {
  const ref = useRef();

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onClickOutside();
    }
  };

  const handleClick = (e) => {
    const node = ref.current;

    if (node.contains(e.target)) {
      return; 
    }

    onClickOutside();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  }, [handleClick]);

  return (
    <div className="List-Title-Edit" ref={ref}>
      <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Enter Task Title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
      {deleteList && <ion-icon name="trash" onClick={deleteList} />}
    </div>
  );
};

export default BoardEditor;
