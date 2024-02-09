import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import AlertaComponent from "../../components/AlertaComponent";
import TrendsComponent from "../../components/TrendsComponent";

export default function Trends(){
    return(
        <>
        <Col className={styles.container}>
            <Row className={styles.center}>
                <Col xs={12} sm={8} md={10}>
                    <AlertaComponent />
                    <TrendsComponent/>
                </Col>
            </Row>
        </Col>
        </>
    )
}
