import { Button, Card } from "react-bootstrap"; // Importe o Spinner do react-bootstrap
import styles from "./styles.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import perfil from "../NavBarDentro/img/perfil5.png";
import { Link, useParams } from "react-router-dom"; // Importe o Link do react-router-dom
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AlertaContext } from "../../context/alerta/index";
import { BiLike, BiSolidLike, BiCommentDetail } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";

export default function ClickComponent() {
  const [ text, setText ] = useState('');
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);
  const [ swootData, setSwootData] = useState([]);
  const [ currentSwoot, setCurrentSwoot] = useState({})
  let { id } = useParams();

  async function getCurrentSwoot() {
    try {
      const response = await axios.get('http://localhost:8080/swoot/get/' + id);
      return response.data.swoot;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {};
    }
  }

  useEffect(() => {
    async function fetchData() {
      const swootdata = await getCurrentSwoot();
      setCurrentSwoot(swootdata);
    }

    fetchData();
  }, [id]);

  function ShowLike(likes) {
    var token = sessionStorage.getItem('token');
    const jwt = jwtDecode(token);

    const searchIndex = likes.likes.findIndex(user => user._id == jwt.userid);
    if (searchIndex != -1)
      return <BiSolidLike className={styles.interactionButtons} style={{ color: '#f31c68' }} />

    return <BiLike className={styles.interactionButtons} style={{ color: '#f31c68' }} />
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
      const res = await axios.get("http://localhost:8080/swoot/get-all-answers/" + id);
      setSwootData(res.data.swoots);
      return res.data.swoots;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function setSwoots() {
    const swoots = await getSwoots();
    setSwootData(swoots);
  }

  useEffect(() => {
    setSwoots();
  }, []);

  async function answerSwoot(id) {
    const token = sessionStorage.getItem('token');

    try {
      const res = await axios.post("http://localhost:8080/swoot", {
        token: token, text: text, isAnswer: id
      });
      setSwoots()
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  return (
    <>
      <div className={styles.alinhando}>
        <Row className={styles.justifycontentbetween}>
          <div className={styles.teste}>
            <div>
              <Container className={`${styles.Container} ${styles.marginRight}`}>
                <Row className={styles.row}>
                  <Col xs={4} md={3} className={styles.imagem}>
                    <Image className={styles.actualimg} src={perfil} roundedCircle />
                    <Col className={styles.date}>
                      <div>
                        <p className={styles.name}>{currentSwoot.user?.name}</p>
                        <p className={styles.hide}>@{currentSwoot.user?.username}</p>
                      </div>
                    </Col>
                  </Col>
                  <Col className={styles.texto}>
                    <p>{currentSwoot.text}</p>
                  </Col>
                  <Stack direction="vertical" gap={3}>
                    <Form.Control
                      as="textarea"
                      style={{ height: 140 }}
                      maxLength={255}
                      className={styles.inp}
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                      aria-describedby="swootHelpBlock"
                      placeholder="O que deseja dizer?"
                    />
                    <Button className={styles.form__button} onClick={() => answerSwoot(id)}>
                      Swoot
                    </Button>
                  </Stack>
                </Row>
              </Container>
            </div>
            <div>
              {swootData?.slice(0).reverse().map((swoot) => (
                <Container className={styles.Container} key={swoot._id}>
                  <Row className={styles.row}>
                    <Col xs={4} md={3} className={styles.imagem}>
                      <Link className={styles.link} to={'/perfil/' + swoot.user._id} replace>
                        <Image className={styles.img} src={perfil} roundedCircle />
                      </Link>
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
                          <ShowLike likes={swoot.likes} />
                          <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>{swoot.likes?.length}</div>
                        </div>
                      </Button>
                      <Link
                        to={`/ClickSweet/${swoot._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{ display: "flex" }}>
                          <BiCommentDetail className={styles.interactionButtons} style={{ color: '#f31c68' }} />
                          <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>0{ }</div>
                        </div>
                      </Link>
                    </Card.Footer>
                  </Row>
                </Container>
              ))}
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}
