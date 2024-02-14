import { Button, Card } from "react-bootstrap"; // Importe o Spinner do react-bootstrap
import styles from "./styles.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import perfil from "../NavBarDentro/img/perfil5.png";
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AlertaContext } from "../../context/alerta/index";
import { BiLike, BiSolidLike, BiCommentDetail } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";

export default function ClickComponent() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);
  const [swootData, setSwootData] = useState([]);

  function ShowLike({ likes }) {
    var userid = jwtDecode(sessionStorage.getItem("token"));
    let curtido = false;

    if (likes && likes.likes) {
      likes.likes.map((like) => {
        if (like.user._id == userid.userid) curtido = true;
      });
    }
    if (curtido)
      return (
        <BiSolidLike
          className={styles.interactionButtons}
          style={{ color: "#f31c68" }}
        />
      );

    return (
      <BiLike
        className={styles.interactionButtons}
        style={{ color: "#f31c68" }}
      />
    );
  }

  async function getRespostas(id){
    try {
      const res = await axios.get(`http://localhost:8080/resposta/get-all/${id}`)
      console.log(res.data)
    } catch (error) {
      
    }
  }

  async function likeSwoot(swootid) {
    try {
      var token = sessionStorage.getItem("token");
      const res = await axios.post("http://localhost:8080/likes", {
        token,
        swootid,
      });
      setSwoots();
      return res.message;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function getSwoots() {
    try {
      const res = await axios.get("http://localhost:8080/swoot/get-all");
      console.log(res.data)
      
      setSwootData(res.data.swoots);
      return res.data.swoots;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function getLikes(swootid) {
    try {
      const res = await axios.get(
        "http://localhost:8080/likes/get-all/" + swootid
      );
      return res.data.likes;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function setSwoots() {
    const swoots = await getSwoots();
    getSwoots(swoots[0]._id)
    const swootsWithLikes = await Promise.all(
      swoots.map(async (swoot) => {
        const likes = await getLikes(swoot._id);
        return { ...swoot, likes };
      })
    );
    setSwootData(swootsWithLikes);
  }

  useEffect(() => {
    setSwoots();
  }, []);

  return (
    <>
      <div className={styles.alinhando}>
        <Row className={styles.justifycontentbetween}>
          <div className={styles.teste}>
            <div>
              <Container className={`${styles.Container} ${styles.marginRight}`}>
                <Row className={styles.row}>
                  <Col xs={4} md={3} className={styles.imagem}>
                    <Image className={styles.img} src={perfil} roundedCircle />
                    <Col className={styles.date}>
                      <div>
                        <p className={styles.name}>fulano</p>
                        <p className={styles.hide}>@fulano</p>
                      </div>
                    </Col>
                  </Col>
                  <Col className={styles.texto}>
                    <p>fulano</p>
                  </Col>
                  <Stack direction="horizontal" gap={3}>
                    <Form.Control
                      className="me-auto"
                      placeholder="Adicione seu comentario"
                    />

                    <Button className={styles.bt} variant="outline-secondary">
                      Swootar
                    </Button>
                  </Stack>
                </Row>
              </Container>
            </div>
            <div>
              {swootData.slice(0).map((swoot) => {
                return (
                  <Container
                    className={`${styles.Container} ${styles.marginRight}`}
                    key={swoot._id}
                  >
                    <Row className={styles.row}>
                      <Col xs={4} md={3} className={styles.imagem}>
                        <Image
                          className={styles.img}
                          src={perfil}
                          roundedCircle
                        />
                        <Col className={styles.date}>
                          <div>
                            <p className={styles.name}>{swoot.user.name}</p>
                            <p className={styles.hide}>@{swoot.user.username}</p>
                          </div>
                          <p className={styles.hide}>
                            {new Date(swoot.createdAt).toUTCString().slice(5, 16)}
                          </p>
                        </Col>
                      </Col>
                      <Col className={styles.texto}>
                        <p>{swoot.text}</p>
                      </Col>
                      <Card.Footer className={styles.footer}>
                        <Button
                          variant="link"
                          style={{ textDecoration: "none" }}
                          onClick={() => likeSwoot(swoot._id)}
                        >
                          <div style={{ display: "flex" }}>
                            <ShowLike likes={swoot} />
                            <div
                              className={styles.hide}
                              style={{ margin: "0 0 0 10px" }}
                            >
                              {swoot.likes?.length}
                            </div>
                          </div>
                        </Button>
                        <Button
                          variant="link"
                          style={{ textDecoration: "none" }}
                        >
                          <div style={{ display: "flex" }}>
                            <BiCommentDetail
                              className={styles.interactionButtons}
                              style={{ color: "#f31c68" }}
                            />
                            <div
                              className={styles.hide}
                              style={{ margin: "0 0 0 10px" }}
                            >
                              0{}
                            </div>
                          </div>
                        </Button>
                      </Card.Footer>
                    </Row>
                  </Container>
                );
              })}
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}
