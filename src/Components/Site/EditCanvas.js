import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import ColorPalette from "./ColorPalette";

export default function EditCanvas(){
    return <Container>
        <Row>
            <ColorPalette/>
            <Col>
                <InputGroup className="col-6">
                    <InputGroupText>Draw Duration</InputGroupText>
                    <Form.Control type="number"></Form.Control>
                </InputGroup>
            </Col>
            <Col>
                <InputGroup className="col-6">
                    <InputGroupText>Grid Density</InputGroupText>
                    <Form.Control type="number"></Form.Control>
                </InputGroup>
            </Col>
        </Row>
    </Container>
}