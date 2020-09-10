import React from "react";

export default function InputSearch({ handleSearch }) {
  const handleSearchType = async (event) => {
    event.key === "Enter"
      ? await handleSearch(document.getElementById("search").value)
      : console.log("Try");
  };

  return (
    <div class="input-field vertical-align" style={{ width: "80%" }}>
      <i class="material-icons prefix">search</i>

      <input
        type="text"
        id="search"
        className="validate"
        onKeyUp={handleSearchType}
      />
      <label for="icon_prefix">Buscar</label>
    </div>
  );
}
