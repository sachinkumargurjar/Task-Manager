import "../styles/AddBoard.css";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import ListEditor from "./BoardEditor";
import shortid from "shortid";
import EditButtons from "./EditButtons";

const AddBoard = ({ toggleAddingList }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const createList = async () => {
    dispatch({
      type: "ADD_LIST",
      payload: { listId: shortid.generate(), listTitle: title },
    });
    toggleAddingList();
  };

  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel={"Add list"}
        handleCancel={toggleAddingList}
      />
    </div>
  );
};

export default AddBoard;
