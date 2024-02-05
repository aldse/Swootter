import { Col, Row } from "react-bootstrap";
import styles from './styles.module.scss';
import RegistroComponent from "../../components/RegistroComponent";
import AlertaComponent from "../../components/AlertaComponent";

export default function Registro(){
    return(
        <Col className={styles.container}>
            <Row className={styles.center}>
                <Col xs={12} sm={8} md={6}>
                    <AlertaComponent />
                    <RegistroComponent />
                </Col>
            </Row>
        </Col>
    )
}