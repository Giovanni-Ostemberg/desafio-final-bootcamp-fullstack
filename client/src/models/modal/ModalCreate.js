import React, { useState } from "react";
import M from "materialize-css";
import css from "./modal.module.css";
import axios from "axios";

export default function ModalCreate() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(new Date("yyyy-MM"));

  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems, {
      autoClose: true,
    });
  });

  const handleSubmit = async () => {
    const setFields = async () => {
      setDescription(document.getElementById("description").value);
      setCategory(document.getElementById("category").value);
      setValue(document.getElementById("value").value);
      setDate(document.getElementById("date").value);
    };

    await setFields().then(persist());
  };

  const persist = async () => {
    const date = new Date(document.getElementById("date").value);
    const monthString =
      +date.getMonth() + 1 <= 9
        ? "0" + (+date.getMonth() + 1)
        : +date.getMonth() + 1;
    await axios
      .post(
        "https://giovanni-desafio-final.herokuapp.com/api/transaction/create",
        {
          transaction: {
            description: document.getElementById("description").value,
            category: document.getElementById("category").value,
            value: document.getElementById("value").value,
            yearMonth: date.getFullYear() + "-" + monthString,
            yearMonthDay:
              date.getFullYear() + "-" + monthString + "-" + date.getDate(),
            year: date.getFullYear(),
            month: +date.getMonth() + 1,
            day: date.getDate(),
            type: document.querySelector('input[name="tipo"]:checked').value,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      });
  };

  return (
    <div
      id="modalCreate"
      className="modal large"
      style={{ height: "fit-content" }}
    >
      <div className="modal-content">
        <div className="row">
          <h5>Inserir Registro</h5>
          <form className="col s12" onSubmit={persist}>
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
                    <input id="type_plus" name="tipo" type="radio" value="+" />
                    <span className={css.radioReceita}>Receita</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input id="type_minus" name="tipo" type="radio" value="-" />
                    <span className={css.radioDespesa}>Despesa</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-field col">
                <input
                  placeholder="Digite a Descrição"
                  id="description"
                  type="text"
                  className="validate"
                  required
                />
                <label for="first_name">Descrição</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col">
                <input
                  placeholder="Digite a Categoria"
                  id="category"
                  type="text"
                  className="validate"
                  required
                />
                <label for="first_name">Categoria</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="valor"
                  id="value"
                  type="number"
                  step="any"
                  className="validate"
                  required
                />
                <label htmlFor="value">
                  <i className="material-icons prefix">attach_money</i>
                </label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder="date"
                  id="date"
                  type="text"
                  className="datepicker"
                  required
                />
                <label htmlFor="date">
                  <i className="material-icons">date_range</i>
                </label>
              </div>
            </div>
            <button className=" btn right" type="submit">
              +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
