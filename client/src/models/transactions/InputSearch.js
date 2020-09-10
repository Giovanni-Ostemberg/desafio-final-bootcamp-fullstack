import React from "react";

export default function InputSearch({ handleSearch }) {
  const handleSearchType = async (event) => {
    event.key === "Enter"
      ? await handleSearch(document.getElementById("search").value)
      : console.log("Try");
  };

  const focusInput = () => {
    console.log(document.querySelector("#search"));

    document.querySelector("#search").focus();
  };

  return (
    <div class="input-field" style={{ width: "80%" }} onClick={focusInput}>
      <i class="material-icons prefix">search</i>

      <input
        type="text"
        id="search"
        className="validate"
        onKeyUp={handleSearchType}
        // style={{ height: "90%" }}
      />
      <label htmlFor="icon_prefix">Buscar</label>
    </div>
  );
}
