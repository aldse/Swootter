import { useContext, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertaContext } from "../../context/alerta/index";
import CryptoJS from "crypto-js";
import { SECRET } from "../../env";
import NavBarDentro from "../../components/NavBarDentro";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import perfil from "../NavBarDentro/img/perfil5.png";

export default function SwootFeed() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);
  var [swootData, setSwootData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8080/swoot/feed", {
          params: { jsonCrypt: "your-encrypted-data-here" },
        });
        setSwootData(res.data); 
      } catch (error) {
        setMessage("Erro ao se conectar");
        setShow(true);
        setVariant("danger");
      }
    }

    fetchData();
  }, []); 

  return (
    <>
      <Container className={styles.Container}>
        <Row className={styles.row}>
          <Col xs={4} md={3} className={styles.imagem}>
            <Image className={styles.img} src={perfil} roundedCircle />
            <Col className={styles.date}>
              <p>Fulano de Tal</p>
              <p>32 Fev</p>
            </Col>
          </Col>
          <Col xs={2} md={2} className={styles.texto}>
            {swootData ? (
              <>
                <p>{swootData.user}</p>
                <p>{swootData.text}</p>
              </>
            ) : (
              <p>Carregando...</p>
            )}
          </Col>
          <Card.Footer className={styles.footer}>
            <Button className={styles.footer} variant="link">
              Comentário
            </Button>
            <Button className={styles.footer} variant="link">
              Curtida
            </Button>
            <Button className={styles.footer} variant="link">
              Republicar
            </Button>
          </Card.Footer>
        </Row>
      </Container>
    </>
  );
}
