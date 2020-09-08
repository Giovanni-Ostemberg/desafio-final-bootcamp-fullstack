import React from "react";
import M from "materialize-css";
import css from "./modal.module.css";

export default function ModalCreate() {
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems, {});
  });

  return (
    <div id="modalCreate" className="modal" style={{ height: "80%" }}>
      <div className="modal-content">
        <div className="row">
          <h5>Inserir Registro</h5>
          <form
            method="POST"
            className="col s12"
            action="http://localhost:3001/api/transaction/create"
          >
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
                    <input name="tipo" type="radio" checked />
                    <span className={css.radioReceita}>Receita</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input name="tipo" type="radio" />
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
                  className="validate"
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
                />
                <label htmlFor="date">
                  <i className="material-icons">date_range</i>
                </label>
              </div>
            </div>
            <button type="submit">+</button>
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
