import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { AlertaContext } from "../../context/alerta/index";
import './style.css'

function ModalAddSweet(props) {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);

  const [text, setText] = useState("");

  async function handleSubmit(e) {
    if (!formValid()) return;

    try {
      var res = await axios.post("http://localhost:8080/swoot", {
        text, token: sessionStorage.getItem('token'), 
      });

      setMessage(res.data.message);
      setVariant("success");
      setShow(true);
      setText("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function formValid() {
    if (text.trim() === "") {
      setMessage("O campo não pode estar vazio.");
      setShow(true);
      setVariant("danger");
      return false;
    }

    if (!text.trim()) {
      setMessage("Seu sweet deve ser maior.");
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
      <form>
        <Modal.Header className={styles.border}></Modal.Header>
        <Modal.Body className={styles.modal}>
          <h3 className={styles.titulo}>Escreva seu swoot</h3>

          <Form.Control
            as="textarea"
            style={{ height: 130 }}
            maxLength={255}
            className={styles.inp}
            onChange={(e) => setText(e.target.value)}
            value={text}
            aria-describedby="swootHelpBlock"
            placeholder="O que deseja dizer?"
          />
        </Modal.Body>

        <Modal.Footer className={styles.outro}>
          <button className={styles.form__button} type="submit" onClick={handleSubmit}>
            Swoot
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default ModalAddSweet;
