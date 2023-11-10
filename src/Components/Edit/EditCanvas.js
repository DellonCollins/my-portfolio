import { forwardRef, useRef } from "react";
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
            control : <Form.Control className="text-center" ref={drawDurationRef} defaultValue={drawDuration} type="number" min="10" max="250" aria-label="Draw Duration Input" onKeyDown={handleDrawDuration} onBlur={handleDrawDuration} />
        },
        { 
            name : "Grid Density", 
            icon : "bi bi-grid-3x3",
            control : <Form.Control defaultValue={gridDensity * 10} type="range" min="10" max="100"  aria-label="Grid Density Slider" onChange={handleGridDensity}/>
        },
        { 
            name : "Particle Density", 
            icon : "bi bi-three-dots",
            control : <Form.Control defaultValue={particleDensity * 10} type="range" min="10" max="100" aria-label="Particle Density Slider" onChange={handleParticleDensity} />
        },
        { 
            name : "Chaos", 
            icon : "bi bi-dice-5",
            control : <Form.Control defaultValue={chaos} type="range" min="10" max="90" aria-label="Particle Density Slider" onChange={handleChaos} />
        }
    ]
    
    return <Container className="pb-5" ref={ref}>
        <Row >
            <ColorPalette/>
        </Row>

        <Row className="pt-3"> 
            <Col className="col-12">
                <i className="bi bi-sliders" style={{fontSize:"3rem"}} alt="palette icon"/>
            </Col>
            { controls.map((control, value) => {
                return <Col className="mb-1" md={6} key={value} >
                    <InputGroup className="h-100 ">
                        <InputGroupText style={{fontWeight: 600}}>
                            {control.name} &nbsp;
                            <i className={control.icon} style={{fontSize:"1.5rem"}}/>
                        </InputGroupText>  
                        {control.control}
                    </InputGroup>
                </Col>
            }) }
        </Row>

        <Row  className="pt-3">
            <Col className="mb-1" md={6}>
                <InputGroup>
                    <Button className="flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="success" onClick={toggleResetSwitch}>
                        Reset &nbsp;
                        <i className="bi bi-arrow-repeat" style={{fontSize:"2rem"}}/>
                    </Button>
                </InputGroup>
            </Col>
            <Col md={6}>
                <InputGroup>
                    <Button className="flex-grow-1 fw-bold d-inline-flex align-items-center justify-content-center py-0" variant="secondary" onClick={toggleSaveSwitch}>
                        <span className="py-auto">Save &nbsp;</span>
                        <i className="bi bi-save2" style={{fontSize:"2rem"}}/>
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    </Container>
}

export const ForwardEdit = forwardRef((props,ref)=>{
    return EditCanvas({...props, ref: ref})
})