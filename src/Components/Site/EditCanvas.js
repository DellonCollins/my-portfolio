import { useRef } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import useCanvasStore from "../../Store/CanvasStore";
import ColorPalette from "./ColorPalette";

export default function EditCanvas(){
    
    const drawDuration = useRef()
    const setDrawDuration = useCanvasStore((state)=> state.setDrawDuration)
    const setGridDensity = useCanvasStore((state)=> state.setGridDensity)
    const setParticleDensity = useCanvasStore((state)=> state.setParticleDensity)
    const toggleSaveSwitch = useCanvasStore((state)=> state.toggleSaveSwitch)
    const toggleResetSwitch = useCanvasStore((state)=>state.toggleResetSwitch)

    const handleDrawDuration = (e) => {
        if((e.type === 'keydown' && e.key === 'Enter') || e.type === 'blur'){
            setDrawDuration(drawDuration.current.value)
        }
    }

    const handleGridDensity = (e)=> {
        setDrawDuration(drawDuration.current.value)
        setGridDensity(e.target.value)
    }

    const handleParticleDensity = (e)=> {
        setDrawDuration(drawDuration.current.value)
        setParticleDensity(e.target.value)
    }
    return <Container>
        <Row>
            <ColorPalette/>
            <Col md={6}>
                <InputGroup >
                    <InputGroupText>Draw Duration</InputGroupText>
                    <Form.Control ref={drawDuration} defaultValue="10" type="number" min="10" max="250" onKeyDown={handleDrawDuration} onBlur={handleDrawDuration}></Form.Control>
                </InputGroup>
            </Col>
            <Col md={6}>
                <InputGroup>
                    <InputGroupText>Grid Density</InputGroupText>
                    <Form.Control defaultValue="3" type="range" min="1" max="10" onChange={handleGridDensity} ></Form.Control>
                </InputGroup>
            </Col>
            <Col md={6}>
                <InputGroup>
                    <InputGroupText>Particle Density</InputGroupText>
                    <Form.Control defaultValue="3" type="range" min="1" max="10" onChange={handleParticleDensity} ></Form.Control>
                </InputGroup>
            </Col>
            <Col md={6}>
                <InputGroup>
                    <Form.Control type="button" value="Reset" onClick={toggleResetSwitch}></Form.Control>
                </InputGroup>
            </Col>
            <Col md={6}>
                <InputGroup>
                    <Form.Control type="button" value="Save" onClick={toggleSaveSwitch}></Form.Control>
                </InputGroup>
            </Col>
        </Row>
    </Container>
}