import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import { SECRET } from "../../env";
import axios from "axios";

import { AlertaContext } from "../../context/alerta/index";
import CryptoJS from "crypto-js";

function ModalAddSweet(props) {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);

  var [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formValid()) return;

    const json = {
      text,
    };
    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json)
      //   SECRET
    ).toString();
    try {
      var res = await axios.post("http://localhost:8080/swoot", {
        jsonCrypt,
      });

      setMessage(res.data.message);
      setVariant("success");
      setShow(true);
      setText("");
    } catch (error) {
      console.log(error);
    }
  }

  function formValid() {
    if (text.includes(" ")) {
      setMessage("Seu sweet deve ser maior");
      setShow(true);
      setVariant("danger");
      return false;
    }

    if (!text.includes(" ")) {
      setMessage("Seu sweet deve ser maior");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (text.length < 0) {
      setMessage("Seu sweet deve ser maior");
      setShow(true);
      setVariant("danger");
      return false;
    }

    return true;
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles.border}></Modal.Header>
      <Modal.Body className={styles.modal}>
        <h4 className={styles.titulo}>Adicionar Sweeet</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className={styles.inp}
            onChange={(e) => setText(e.target.value)}
            type="sweet"
            id="inputsweet"
            value={text}
            aria-describedby="sweetHelpBlock"
            placeholder="O que deseja dizer?"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.outro}>
        <button
          className={styles.form__button}
          type="submit"
        >
          Swettar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalAddSweet;
