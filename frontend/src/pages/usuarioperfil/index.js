import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import UsuarioPerfilComponent from "../../components/UsuarioPerfilComponent";
import AlertaComponent from "../../components/AlertaComponent";
import { useState } from "react";
import Sweets from "../../components/Sweets";
import Likes from "../../components/Likes";
import Respostas from "../../components/Respostas";

export default function UsuarioPerfil(){
    const [cards, setCards] = useState(0);

    return(
        <>
        <Col className={styles.container}>
            <Row className={styles.center}>
                <Col xs={12} sm={8} md={10}>
                    <AlertaComponent />
                    <UsuarioPerfilComponent setCards={setCards}/>
                    {cards == 0 && <Sweets/>}
                    {cards == 1 && <Respostas/>}
                    {cards == 2 && <Likes/>}
                </Col>
            </Row>
        </Col>
        </>
    )
}
