import "../styles/TaskEditor.css";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
import FileBase from "react-file-base64";

const TaskEditor = ({
  file,
  text: initialText,
  onSave,
  onCancel,
  onDelete,
  adding,
}) => {
  const [text, setText] = useState(initialText || "");
  const [media, setMedia] = useState(file || "");

  const handleChangeText = (event) => setText(event.target.value);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(text);
    }
  };

  return (
    <div className="Edit-Card">
      <div className="Card">
        <TextareaAutosize
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this task..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <div className="Image">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setMedia(base64 || file)}
        />
      </div>
      <EditButtons
        handleSave={() => {
          console.log(media);
          onSave(text, media);
        }}
        saveLabel={adding ? "Add task" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default TaskEditor;
