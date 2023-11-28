import { cloneElement, forwardRef, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import useCanvasStore from "../../Store/CanvasStore";
import ColorPalette from "./ColorPalette";
import "./Edit.scss"

export default function EditCanvas({ref}){
    const [reset, setReset] = useState(false)
    const [dimmer, setDimmer] = useState(false)
    const inputRefs = useRef({})

    const parameters = useCanvasStore(state => ({
        drawDuration : state.drawDuration,
        gridDensity : state.gridDensity,
        particleDensity : state.particleDensity,
        chaos : state.chaos,
        playSwitch : state.playSwitch,
    }))

    const set = useCanvasStore(state => ({
        drawDuration : state.setDrawDuration,
        gridDensity : state.setGridDensity,
        particleDensity : state.setParticleDensity,
        chaos : state.setChaos
    }))

    const toggle = useCanvasStore(state => ({
        save : state.toggleSaveSwitch,
        reset : state.toggleResetSwitch,
        play : state.togglePlaySwitch
    }))
    
    const handleDrawDuration = (e) => {
        if((e.type === 'keydown' && e.key === 'Enter') || e.type === 'blur'){
            if(!inputRefs.current.drawDuration.value || inputRefs.current.drawDuration.value < 10) { inputRefs.current.drawDuration.value = 10}
            inputRefs.current.drawDuration.blur()
            set.drawDuration(inputRefs.current.drawDuration.value)
        }
    }

    const handleGridDensity = (e)=> {
        set.drawDuration(inputRefs.current.drawDuration.value)
        set.gridDensity(e.target.value / 10)
    }

    const handleParticleDensity = (e)=> {
        set.drawDuration(inputRefs.current.drawDuration.value)
        set.particleDensity(e.target.value / 10)
    }

    const handleChaos = (e)=> {
        set.chaos(e.target.value)
    }

    const resetSettings = () => {
        inputRefs.current.drawDuration.value = 10
        set.drawDuration(10)
        inputRefs.current.gridDensity.value = 30
        set.gridDensity(3)
        inputRefs.current.particleDensity.value = 30
        set.particleDensity(3)
        inputRefs.current.chaos.value = 50
        set.chaos(50)
        setReset(true)
    }

    const controls = [
        { 
            name : "Draw Duration", 
            icon : "bi bi-alarm",
            control : <Form.Control className="text-center" ref={(el) => inputRefs.current.drawDuration = el} defaultValue={parameters.drawDuration} placeholder="length in seconds" type="number" min={10} max={250} onKeyDown={handleDrawDuration} onBlur={handleDrawDuration} />
        },
        { 
            name : "Grid Density", 
            icon : "bi bi-grid-3x3",
            control : <Form.Control ref={(el) => inputRefs.current.gridDensity = el} defaultValue={parameters.gridDensity * 10} type="range" min="10" max="100" onChange={handleGridDensity}/>
        },
        { 
            name : "Particle Quantity", 
            icon : "bi bi-three-dots",
            control : <Form.Control ref={(el) => inputRefs.current.particleDensity = el} defaultValue={parameters.particleDensity * 10} type="range" min="10" max="100" onChange={handleParticleDensity} />
        },
        { 
            name : "Chaos", 
            icon : "bi bi-dice-5",
            control : <Form.Control ref={(el) => inputRefs.current.chaos = el} defaultValue={parameters.chaos} type="range" min="10" max="90" onChange={handleChaos} />
        }
    ]
    
    return <Container className={"edit-container pb-5 " + (dimmer ? "dim" : "")} ref={ref} >
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
            <Col md={6} role="none">
                <Button className="w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="light" onClick={resetSettings} title="Reset parameters to default">
                    <span className="py-auto">Reset &nbsp;</span>
                    <i className="bi bi-arrow-repeat" style={{fontSize:"2rem"}} aria-hidden />
                </Button>
            </Col>
        </Row>
            
        <Row className="pt-3">
            <Col className="mb-1" md={6} role="none">
                <Button className="w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="primary" onClick={toggle.play} title="Play/Pause the canvas">
                    {
                        parameters.playSwitch 
                            ?   <>
                                    Pause &nbsp;
                                    <i className="bi bi-pause" style={{fontSize:"2rem"}} aria-hidden />
                                </>
                            :   <>
                                    Play &nbsp;
                                    <i className="bi bi-play" style={{fontSize:"2rem"}} aria-hidden />
                                </>
                    }
                </Button>
            </Col>
            <Col className="mb-1" md={6} role="none">
                <Button className="btn btn-pink text-white w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" onClick={toggle.reset} title="Clear the canvas">
                    Clear &nbsp;
                    <i className="bi bi-eraser" style={{fontSize:"2rem"}} aria-hidden />
                </Button>
            </Col>
            
            <Col className="mb-1" md={6} role="none">
                <Button className="w-100 flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="success" onClick={toggle.save} title="Save the background as an image">
                    <span className="py-auto">Save &nbsp;</span>
                    <i className="bi bi-floppy" style={{fontSize:"2rem"}} aria-hidden />
                </Button>
            </Col>

            <Col md={6} role="none">
                <Button className="dimmer-button w-100 flex-grow-1 fw-bold align-items-center justify-content-center py-0" 
                    variant={dimmer ? "warning" : "dark" }
                    onClick={()=>setDimmer(!dimmer)} title="Dim the panel">
                    <span className="py-auto">Dimmer &nbsp;</span>
                    <i className={dimmer ? "bi bi-lightbulb" : "bi bi-lightbulb-off"} style={{fontSize:"2rem"}} aria-hidden />
                </Button>
            </Col>
        </Row>
    </Container>
}

export const ForwardEdit = forwardRef((props,ref)=>{
    return EditCanvas({...props, ref: ref})
})