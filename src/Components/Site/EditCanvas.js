import { useEffect, useRef } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import useCanvasStore from "../../Store/CanvasStore";
import ColorPalette from "./ColorPalette";

export default function EditCanvas(){
    
    const drawDuration = useRef()
    const setDrawDuration = useCanvasStore((state)=> state.setDrawDuration)
    const gridDensity = useRef()
    const setGridDensity = useCanvasStore((state)=> state.setGridDensity)

    useEffect(() => {
        const unsubscribe = useCanvasStore.subscribe((state)=>console.log(state))
        return ()=>{
            unsubscribe()
        }
    }, [])

    const handleDrawDuration = (e) => {
        if((e.type === 'keydown' && e.key === 'Enter') || e.type === 'blur'){
            setDrawDuration(drawDuration.current.value)
        }
    }

    const handleGridDensity = (e)=> {
        setDrawDuration(drawDuration.current.value)
        setGridDensity(e.target.value)
    }
    return <Container>
        <Row>
            <ColorPalette/>
            <Col md={6}>
                <InputGroup >
                    <InputGroupText>Draw Duration</InputGroupText>
                    <Form.Control ref={drawDuration} defaultValue="10" type="number" min="10" onKeyDown={handleDrawDuration} onBlur={handleDrawDuration}></Form.Control>
                </InputGroup>
            </Col>
            <Col md={6}>
                <InputGroup>
                    <InputGroupText onClick={console.log}>Grid Density</InputGroupText>
                    <Form.Control defaultValue="1" type="range" min="1" max="10" onChange={handleGridDensity} ></Form.Control>
                </InputGroup>
            </Col>
        </Row>
    </Container>
}