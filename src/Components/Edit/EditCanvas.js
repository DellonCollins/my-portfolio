import { cloneElement, forwardRef, useRef } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import useCanvasStore from "../../Store/CanvasStore";
import ColorPalette from "./ColorPalette";

export default function EditCanvas({ref}){
    
    const drawDurationRef = useRef()

    const drawDuration = useCanvasStore((state)=> state.drawDuration)
    const gridDensity = useCanvasStore((state)=> state.gridDensity)
    const particleDensity = useCanvasStore((state)=> state.particleDensity)
    const chaos = useCanvasStore((state)=> state.chaos)

    const setDrawDuration = useCanvasStore((state)=> state.setDrawDuration)
    const setGridDensity = useCanvasStore((state)=> state.setGridDensity)
    const setParticleDensity = useCanvasStore((state)=> state.setParticleDensity)
    const setChaos = useCanvasStore((state)=> state.setChaos)

    const toggleSaveSwitch = useCanvasStore((state)=> state.toggleSaveSwitch)
    const toggleResetSwitch = useCanvasStore((state)=>state.toggleResetSwitch)
    
    const handleDrawDuration = (e) => {
        if((e.type === 'keydown' && e.key === 'Enter') || e.type === 'blur'){
            if(!drawDurationRef.current.value) {drawDurationRef.current.value = 10}
            setDrawDuration(drawDurationRef.current.value)
            console.log(useCanvasStore.getState())
        }
    }

    const handleGridDensity = (e)=> {
        setDrawDuration(drawDurationRef.current.value)
        setGridDensity(e.target.value / 10)
    }

    const handleParticleDensity = (e)=> {
        setDrawDuration(drawDurationRef.current.value)
        setParticleDensity(e.target.value / 10)
    }

    const handleChaos = (e)=> {
        setChaos(e.target.value)
    }

    const controls = [
        { 
            name : "Draw Duration", 
            icon : "bi bi-alarm",
            control : <Form.Control className="text-center" ref={drawDurationRef} defaultValue={drawDuration} placeholder="10" type="number" min="10" max="250" onKeyDown={handleDrawDuration} onBlur={handleDrawDuration} />
        },
        { 
            name : "Grid Density", 
            icon : "bi bi-grid-3x3",
            control : <Form.Control defaultValue={gridDensity * 10} type="range" min="10" max="100" onChange={handleGridDensity}/>
        },
        { 
            name : "Particle Quantity", 
            icon : "bi bi-three-dots",
            control : <Form.Control defaultValue={particleDensity * 10} type="range" min="10" max="100" onChange={handleParticleDensity} />
        },
        { 
            name : "Chaos", 
            icon : "bi bi-dice-5",
            control : <Form.Control defaultValue={chaos} type="range" min="10" max="90" onChange={handleChaos} />
        }
    ]
    
    return <Container className="pb-5" ref={ref}>
        <Row >
            <ColorPalette/>
        </Row>

        <Row className="pt-3" aria-hidden>
            <i className="bi bi-sliders" style={{fontSize:"3rem"}} alt="palette icon"/>
        </Row>

        <Row aria-label="Canvas Parameters" role="region">     
            { controls.map((control, index) => {
                return <Col className="mb-1" md={6} key={index} >
                    <InputGroup className="h-100" role="group" aria-label={`${control.name} Input Group`}>
                        <InputGroupText style={{fontWeight: 600}} id={`canvas-param-${index}`} role="none">
                            {control.name}<span role="none">&nbsp;</span>
                            <i className={control.icon} style={{fontSize:"1.5rem"}} aria-hidden/>
                        </InputGroupText>  
                        {cloneElement(control.control, {"aria-labelledby": `canvas-param-${index}`})}
                    </InputGroup>
                </Col>
            }) }
        </Row>

        <Row  className="pt-3">
            <Col className="mb-1" md={6} role="none">
                <Button className="w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="success" onClick={toggleResetSwitch}>
                    Restart &nbsp;
                    <i className="bi bi-arrow-repeat" style={{fontSize:"2rem"}} aria-hidden />
                </Button>
            </Col>
            <Col md={6} role="none">
                <Button className="w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="secondary" onClick={toggleSaveSwitch}>
                    <span className="py-auto">Save &nbsp;</span>
                    <i className="bi bi-save2" style={{fontSize:"2rem"}} aria-hidden/>
                </Button>
            </Col>
        </Row>
    </Container>
}

export const ForwardEdit = forwardRef((props,ref)=>{
    return EditCanvas({...props, ref: ref})
})