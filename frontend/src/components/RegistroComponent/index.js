import { useContext, useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertaContext } from "../../context/alerta/index";
import CryptoJS from "crypto-js";
import { SECRET } from "../../env";

export default function RegistroComponent() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);

  var [nome, setNome] = useState("");
  var [nomeusuario, setNomeusuario] = useState("");
  var [email, setEmail] = useState("");
  var [senha, setSenha] = useState("");
  var [confirmesenha, setConfirmeSenha] = useState("");
  var [datanasc, setDataNasc] = useState(Date());

  async function handleSubmit(e) {
    if (!formValid()) return;

    const json = {
      name: nome,
      birthdate: datanasc,
      username: nomeusuario,
      email: email,
      password: senha,
      confirmpassword: confirmesenha
    };

    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json),
      SECRET
    ).toString();
    
    try {
      var res = await axios.post("http://localhost:8080/user/register", {
        jsonCrypt,
      });

      setMessage(res.data.message);
      setVariant("success");
      setShow(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function formValid() {
    if (nome.length <= 5) {
      setMessage("Seu nome deve possuir mais de 5 letras");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (nomeusuario.includes(" ")) {
      setMessage("Insira um nome de usuário válido");
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
      setMessage("Insira um e-mail válido");
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
      setMessage("As senhas devem ser iguais");
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
        <Card.Title className={styles.reg}>Registrar-se</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form className={styles.card__form} onSubmit={handleSubmit}>
          <div className={styles.form__transform}>
            <div className={styles.form__topic}>
              <div>
                <Form.Label>Nome completo</Form.Label>
                <Form.Control
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={styles.form__input}
                />
              </div>
              <div>
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control
                  placeholder="Digite seu nome de usuário"
                  value={nomeusuario}
                  onChange={(e) => setNomeusuario(e.target.value)}
                  className={styles.form__input}
                />
              </div>
              <div>
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control
                  type="date"
                  value={datanasc}
                  onChange={(e) => setDataNasc(e.target.value)}
                  className={styles.form__input}
                />
              </div>
            </div>
            <div className={styles.form__topic}>
              <div>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.form__input}
                />
              </div>
              <div>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  value={senha}
                  placeholder="Digite sua senha"
                  onChange={(e) => setSenha(e.target.value)}
                  className={styles.form__input}
                />
              </div>
              <div>
                <Form.Label>Confirme sua senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha novamente"
                  value={confirmesenha}
                  onChange={(e) => setConfirmeSenha(e.target.value)}
                  className={styles.form__input}
                />
              </div>
            </div>
          </div>
          
          <button className={styles.form__button} type="submit">
            Entrar
          </button>
        </Form>
      </Card.Body>
    </Card>
  );
}
