import { Container, Row, Col } from "react-bootstrap"
import { P5Canvas } from "../Sketch/p5Canvas"
import "./Home.scss"

export default function Home(){
    const bulletPoints = [
        "Frontend Developer",
        "Computer Scientist",
        "Musician"
    ]
    return <Container fluid className="text-white h-100">
        <Row className="pt-5 h-100">
            <Col className="pt-5 pt-lg-2" lg>
                <h1 className="display-1 main-text">Dellon Collins</h1>
                
            </Col>
            <Col className="d-flex align-items-center">
                <div className="w-100">
                {bulletPoints.map(value => { return <div className="h3 peg py-lg-4 text-end w-100">{value}</div> })}
                </div>
            </Col>
        </Row>
    </Container>
}