import { cloneElement, forwardRef, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import useCanvasStore from "../../Store/CanvasStore";
import ColorPalette from "./ColorPalette";

export default function EditCanvas({ref}){
    const [reset, setReset] = useState(false)
    const inputRefs = useRef({})

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
            if(!inputRefs.current.drawDuration.value) { inputRefs.current.drawDuration.value = 10 }
            setDrawDuration(inputRefs.current.drawDuration.value)
        }
    }

    const handleGridDensity = (e)=> {
        setDrawDuration(inputRefs.current.drawDuration.value)
        setGridDensity(e.target.value / 10)
    }

    const handleParticleDensity = (e)=> {
        setDrawDuration(inputRefs.current.drawDuration.value)
        setParticleDensity(e.target.value / 10)
    }

    const handleChaos = (e)=> {
        setChaos(e.target.value)
    }

    const resetSettings = () => {
        inputRefs.current.drawDuration.value = 10
        setDrawDuration(10)
        inputRefs.current.gridDensity.value = 30
        setGridDensity(3)
        inputRefs.current.particleDensity.value = 30
        setParticleDensity(3)
        inputRefs.current.chaos.value = 50
        setChaos(50)
        setReset(true)
    }

    const controls = [
        { 
            name : "Draw Duration", 
            icon : "bi bi-alarm",
            control : <Form.Control className="text-center" ref={(el) => inputRefs.current.drawDuration = el} defaultValue={drawDuration} placeholder="10" type="number" min="10" max="250" onKeyDown={handleDrawDuration} onBlur={handleDrawDuration} />
        },
        { 
            name : "Grid Density", 
            icon : "bi bi-grid-3x3",
            control : <Form.Control ref={(el) => inputRefs.current.gridDensity = el} defaultValue={gridDensity * 10} type="range" min="10" max="100" onChange={handleGridDensity}/>
        },
        { 
            name : "Particle Quantity", 
            icon : "bi bi-three-dots",
            control : <Form.Control ref={(el) => inputRefs.current.particleDensity = el} defaultValue={particleDensity * 10} type="range" min="10" max="100" onChange={handleParticleDensity} />
        },
        { 
            name : "Chaos", 
            icon : "bi bi-dice-5",
            control : <Form.Control ref={(el) => inputRefs.current.chaos = el} defaultValue={chaos} type="range" min="10" max="90" onChange={handleChaos} />
        }
    ]
    
    return <Container className="pb-5" ref={ref}>
        <Row role="region" title="Color List">
            <ColorPalette resetFlag={reset} clearResetFlag={()=>setReset(false)}/>
        </Row>

        <Row className="pt-3" aria-hidden>
            <i className="bi bi-sliders" style={{fontSize:"3rem"}} alt="palette icon"/>
        </Row>

        <Row aria-label="Canvas Parameters" role="region">     
            { controls.map((control, index) => {
                return <Col className="mb-1" md={6} key={index} >
                    <InputGroup className="h-100" role="group" aria-label={`${control.name} Input Group`} title={`${control.name}`}>
                        <InputGroupText style={{fontWeight: 600, letterSpacing:"1px"}} id={`canvas-param-${index}`} role="none" >
                            {control.name}<span role="none">&nbsp;</span>
                            <i className={control.icon} style={{fontSize:"1.5rem"}} aria-hidden/>
                        </InputGroupText>  
                        {cloneElement(control.control, {"aria-labelledby": `canvas-param-${index}`})}
                    </InputGroup>
                </Col>
            }) }
        </Row>
            
        <Row className="pt-3">
            <Col className="mb-1" md={6} role="none">
                <button className="btn btn-pink text-white w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" onClick={toggleResetSwitch} title="Clear the canvas">
                    Clear &nbsp;
                    <i className="bi bi-eraser" style={{fontSize:"2rem"}} aria-hidden />
                </button>
            </Col>
            <Col className="mb-1" md={6} role="none">
                <Button className="w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="success" onClick={resetSettings} title="Reset parameters to default">
                    <span className="py-auto">Reset &nbsp;</span>
                    <i className="bi bi-arrow-repeat" style={{fontSize:"2rem"}} aria-hidden />
                </Button>
            </Col>
            <Col md={6} role="none">
                <Button className="w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="secondary" onClick={toggleSaveSwitch} title="Save the background as an image">
                    <span className="py-auto">Save &nbsp;</span>
                    <i className="bi bi-floppy" style={{fontSize:"2rem"}} aria-hidden />
                </Button>
            </Col>
        </Row>
    </Container>
}

export const ForwardEdit = forwardRef((props,ref)=>{
    return EditCanvas({...props, ref: ref})
})