import React from "react";

export default function DeleteButton({ _id, handleDelete }) {
  const deleteRegister = async () => {
    await handleDelete(_id);
  };

  return (
    <div>
      <button className="btn-flat" onClick={deleteRegister}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  );
}
