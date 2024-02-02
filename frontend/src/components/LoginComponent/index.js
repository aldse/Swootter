import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertaContext } from "../../context/alerta/index";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import {SECRET} from "../../env";
import { useNavigate } from 'react-router-dom';

export default function LoginComponent() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);
  const navigate = useNavigate();
  var [valor , setValor] = useState("");
  var [senha, setSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formValid()) return;

    const json = {
      value: valor,
      password: senha,
    };

    try {
      const jsonCrypt = CryptoJS.AES.encrypt(
        JSON.stringify(json),
        SECRET
      ).toString();
      var res = await axios.post("http://localhost:8080/user/login", {
        jsonCrypt,
      });
      sessionStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (error) {
      setMessage("Erro ao se conectar");
      setShow(true);
      setVariant("danger");
    }
  }

  function formValid() {
    // if (!nomeusuario.includes(" ")) {
    //   setMessage("Insira um nome de usuário");
    //   setShow(true);
    //   setVariant("danger");
    //   return false;
    // }
    if (valor.length < 3) {
      setMessage("Insira um nome de usuário OU e-mail válido");
      setShow(true);
      setVariant("danger");
      return false;
    }
    
    if (valor.length < 6) {
      setMessage("Senha inferior a 6 caracteres");
      setShow(true);
      setVariant("danger");
      return false;
    }

    return true;
  }

  return (
    <Card className={styles.card}>
      <Card.Header className={styles.card__header}>
        <Card.Title className={styles.reg}>Swootter</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form className={styles.card__form} onSubmit={handleSubmit}>
          {/* <Form.Label>Insira seu e-mail ou user</Form.Label> */}
          <Form.Control
            placeholder="Digite seu e-mail ou nome de usuário"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          {/* <Form.Label>Insira sua senha</Form.Label> */}
          <Form.Control
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />

          <Button
            className={`glow-on-hover`}
            type="submit"
            style={{
              width: "200px",
              height: "50px",
              border: "none",
              backgroundColor: "#4D9FFD",
            }} 
          >
              Entrar
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}
