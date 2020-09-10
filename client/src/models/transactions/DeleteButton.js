import React from "react";

export default function DeleteButton({ _id, handleDelete, retrieveReports }) {
  const deleteRegister = async () => {
    await handleDelete(_id);
    await retrieveReports();
  };

  return (
    <div>
      <button className="btn-flat" onClick={deleteRegister}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  );
}
