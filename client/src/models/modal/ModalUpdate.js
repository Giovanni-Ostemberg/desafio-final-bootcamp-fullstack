import React, { useState, useEffect } from "react";
import M from "materialize-css";
import css from "./modal.module.css";
import axios from "axios";

export default function ModalUpdate({
  oldDescription,
  oldCategory,
  oldValue,
  oldDate,
  oldType,
  _id,
}) {
  const [description, setDescription] = useState(oldDescription);
  const [category, setCategory] = useState(oldCategory);
  const [value, setValue] = useState(oldValue);
  const [date, setDate] = useState(oldDate);
  const [type, setType] = useState(oldType);

  const initModal = () => {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {});
  };

  useEffect(() => {
    console.log(oldType);
    const start = async () => {
      var elems = document.querySelectorAll("modalUpdate" + _id);
      var instances = M.Datepicker.init(elems, {
        // format: "dd-mm-yyyy",
      });
      initModal();
    };
    start();
  }, []);

  // const handleSubmit = async () => {
  //   const setFields = async () => {
  //     setDescription(document.getElementById("description").value);
  //     setCategory(document.getElementById("category").value);
  //     setValue(document.getElementById("value").value);
  //     setDate(document.getElementById("date").value);
  //   };

  //   await setFields().then(persist());
  // };

  const persistUpdate = async () => {
    const date = new Date(document.getElementById("date" + _id).value);
    const monthString =
      +date.getMonth() + 1 <= 9
        ? "0" + (+date.getMonth() + 1)
        : +date.getMonth() + 1;
    const dayString =
      +date.getDate() <= 9 ? "0" + +date.getDate() : +date.getDate();
    await axios
      .put("http://localhost:3001/api/transaction/update", {
        transaction: {
          _id: _id,
          description: document.getElementById("description" + _id).value,
          category: document.getElementById("category" + _id).value,
          value: +document.getElementById("value" + _id).value,
          yearMonth: date.getFullYear() + "-" + monthString,
          yearMonthDay:
            date.getFullYear() + "-" + monthString + "-" + dayString,
          year: date.getFullYear(),
          month: +date.getMonth() + 1,
          day: date.getDate,
          type: document.querySelector('input[name="tipo"]:checked').value,
        },
      })
      .then(function (response) {
        console.log(response);
      });
  };

  return (
    <div id={"modalUpdate" + _id} className="modal" style={{ height: "80%" }}>
      <div className="modal-content">
        <div className="row">
          <h5>Inserir Registro</h5>
          <form className="col s12">
            <div className="row">
              <div
                className="input-field col"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <div>
                  <label>
                    <input
                      id={"type_plus" + _id}
                      name="tipo"
                      type="radio"
                      value="+"
                    />
                    <span className={css.radioReceita}>Receita</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      id={"type_minus" + _id}
                      name="tipo"
                      type="radio"
                      value="-"
                    />
                    <span className={css.radioDespesa}>Despesa</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-field col">
                <input
                  placeholder="Digite a Descrição"
                  id={"description" + _id}
                  type="text"
                  className="validate "
                  defaultValue={description}
                />
                <label for="first_name" className="active">
                  Descrição
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col">
                <input
                  placeholder="Digite a Categoria"
                  id={"category" + _id}
                  type="text"
                  className="validate "
                  defaultValue={category}
                />
                <label for="first_name" className="active">
                  Categoria
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="valor"
                  id={"value" + _id}
                  type="number"
                  className="validate "
                  defaultValue={value}
                />
                <label htmlFor="value" className="active">
                  <i className="material-icons prefix">attach_money</i>
                </label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder="date"
                  id={"date" + _id}
                  type="text"
                  className="datepicker"
                  defaultValue={date}
                />
                <label htmlFor="date" className="active">
                  <i className="material-icons">date_range</i>
                </label>
              </div>
            </div>
            <button type="submit" onClick={persistUpdate}>
              +
            </button>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn">
          Cancelar
        </button>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          Confirmar
        </a>
      </div>
    </div>
  );
}
