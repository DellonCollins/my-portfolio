import { Button, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import useCanvasStore from "../../Store/CanvasStore";

const minNumColors = 2;

export default function ColorPalette({ resetFlag, clearResetFlag }){  
    const colorStore = useCanvasStore(state => ({ 
        colors: state.colors, 
        setColor : state.setColor, 
        addColor : state.addColor, 
        removeColor : state.removeColor,
        resetColors : state.resetColors
    }))  

    useEffect(() => {
        if(!resetFlag){ return }
        colorStore.resetColors()
        clearResetFlag()
    }, [resetFlag])

    const changeColor = (event) => {
        colorStore.setColor(event.target.id, event.target.value)
    }
    const addColor = (event) => {
        colorStore.addColor(parseInt(event.target.dataset.index))
    }
    const removeColor = (event) => {
        colorStore.removeColor(parseInt(event.target.dataset.index))
    }

    const colorMap = (value, index) => {
        return <Col className="mb-1" md={12} key={index}>
            <InputGroup key={index} role="group" title={`Color Group ${index + 1}`}>
                <InputGroupText style={{fontWeight: 600, letterSpacing:"1px"}}> {`Color ${index + 1}`}</InputGroupText>

                <Form.Control className="h-auto" type="color" value={value} onChange={changeColor} id={`${index}`} title={`Select color ${index + 1}`}></Form.Control>
                
                <Button className="p-2" variant="primary" onClick={addColor} data-index={`${index}`} aria-label={`Add color ${index + 1}`} title={`Add color ${index + 1}`}> 
                    <i className="bi bi-plus-lg" style={{fontSize:"1.5rem"}} data-index={`${index}`} alt="add color" aria-hidden="true"/>
                </Button>

                <Button className="p-2" variant={colorStore.colors.length <= minNumColors ? "outline-danger" : "danger"} onClick={removeColor} data-index={`${index}`} aria-label={`Remove color ${index + 1}`} title={`Remove color ${index + 1}`} disabled={colorStore.colors.length <= minNumColors}>
                    <i className="bi bi-dash-lg" style={{fontSize:"1.5rem"}} data-index={`${index}`} alt="remove color" aria-hidden="true"/>
                </Button>
            </InputGroup>
        </Col>
    }

    return <>
        <Row aria-hidden>
            <i className="bi bi-paint-bucket" style={{fontSize:"3rem"}} alt="palette icon"/>
        </Row>
        <div >
            { colorStore.colors.map(colorMap) }
        </div>
    </>
}

