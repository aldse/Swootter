import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertaContext } from "../../context/alerta/index";
import {SECRET} from "../../env";
import CryptoJS from "crypto-js";

export default function RegistroComponent() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);

  var [token, setToken] = useState("");
  var [text, setText] = useState("");
  var [isAnswer, setIsAnswer] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formValid()) return;

    const json = {
      token,
      text,
      isAnswer,
    };
    const jsonCrypt = CryptoJS.AES.encrypt( JSON.stringify(json), SECRET).toString();
    try {
      var res = await axios.post("http://localhost:8080/swoot/create/", {
        jsonCrypt,
      });

      setMessage(res.data.message);
      setVariant("success");
      setShow(true);
      setToken("");
      setText("");
      setIsAnswer("");
    } catch (error) {
      console.log(error);
    }
  }

  function formValid() {
    if (!text.includes(" ")) {
      setMessage("Insira um texto");
      setShow(true);
      setVariant("danger");
      return false;
    }

    return true;
  }

  return (
    <Container className={styles.Containercre}>
        <Row className={styles.row}>
          <Col xs={4} md={3} className={styles.imagem}>
            <Image className={styles.img} src={perfil} roundedCircle />
            <Col className={styles.date}>
              <p>Fulano de Tal</p>
            </Col>
          </Col>
          <Col xs={2} md={2} className={styles.texto}></Col>

          <FloatingLabel controlId="floatingTextarea2" label="Digite seu Swoot"  onSubmit={handleSubmit}>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              onChange={(e) => setText(e.target.value)}
            />
          </FloatingLabel>

          <Button className={styles.footer} type="submit" variant="link">
            Postar
          </Button>
        </Row>
      </Container>
  );
}
