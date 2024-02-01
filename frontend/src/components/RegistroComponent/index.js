import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertaContext } from "../../context/alerta/index";
import CryptoJS from "crypto-js";

export default function RegistroComponent() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);

  var [nome, setNome] = useState("");
  var [nomeusuario, setNomeusuario] = useState("");
  var [email, setEmail] = useState("");
  var [senha, setSenha] = useState("");
  var [confirmesenha, setConfirmeSenha] = useState("");
  var [datanasc, setDataNasc] = useState(Date());

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formValid()) return;

    const json = {
      nome,
      nomeusuario,
      email,
      senha,
      confirmesenha,
      datanasc,
    };
    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json),
    //   SECRET
    ).toString();
    try {
      var res = await axios.post("http://localhost:8080/api/author/", {
        jsonCrypt,
      });

      setMessage(res.data.message);
      setVariant("success");
      setShow(true);
      setNome("");
      setNomeusuario("");
      setEmail("");
      setSenha("");
      setConfirmeSenha("");
    } catch (error) {
      console.log(error);
    }
  }

  function formValid() {
    if (!nome.includes(" ")) {
      setMessage("Insira nome e sobrenome");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (nome.length < 5) {
      setMessage("Insira um nome e sobrenome válidos");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (!nomeusuario.includes(" ")) {
      setMessage("Insira um nome de usuário");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (nomeusuario.length < 3) {
      setMessage("Insira um nome de usuário válido");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (!email.includes("@")) {
      setMessage("Insira um e-mail válidos");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (email.length < 5) {
      setMessage("Insira um e-mail válido");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (confirmesenha !== senha) {
      setMessage("Senha incorreta, as senhas não são iguais");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (senha.length < 6) {
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
        <Card.Title>Registrar-se</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form className={styles.card__form} onSubmit={handleSubmit}>
          <Form.Label>Insira seu nome</Form.Label>
          <Form.Control
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Form.Label>Insira seu nome de usuário</Form.Label>
          <Form.Control
            placeholder="User"
            value={nomeusuario}
            onChange={(e) => setNomeusuario(e.target.value)}
          />
          <Form.Label>Insira seu e-mail</Form.Label>
          <Form.Control
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Insira sua senha</Form.Label>
          <Form.Control
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Form.Label>Confirme sua senha</Form.Label>
          <Form.Control
            type="password"
            value={confirmesenha}
            onChange={(e) => setConfirmeSenha(e.target.value)}
          />
          <Form.Label>Insira sua data de nascimento</Form.Label>
          <Form.Control
            type="date"
            value={datanasc}
            onChange={(e) => setDataNasc(e.target.value)}
          />

          <Button className={styles.card__form__button} type="submit">
            Entrar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
