import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

const minNumColors = 2, defaultColor = "#aaaaaa", defaultColors = ["#ffffff", "#00ffff"];

export default function ColorPalette(){    
    const [colors, setColors] = useState(JSON.parse(sessionStorage.getItem("colors")) || defaultColors)

    useEffect(()=> {
        sessionStorage.setItem("colors", JSON.stringify(colors))
    }, [colors])

    const changeColor = (event) => {
        let newColors = [...colors]
        newColors[event.target.id] = event.target.value
        setColors(newColors)
    }
    const addColor = (event) => {
        let newColors = [...colors], id = parseInt(event.target.dataset.index)
        newColors.splice(id + 1, 0, defaultColor)
        setColors(newColors)
    }
    const removeColor = (event) => {
        let newColors = [...colors], id = parseInt(event.target.dataset.index)
        newColors = newColors.filter((value, index) => index !== id)
        setColors(newColors)
    }


    const colorMap = (value, index) => {
        return <Col className="mb-1" md={12} key={index}>
            <InputGroup key={index} role="group" title={`Color Group ${index + 1}`}>
                <InputGroupText style={{fontWeight: 600, letterSpacing:"1px"}}> {`Color ${index + 1}`}</InputGroupText>

                <Form.Control className="h-auto" type="color" value={value} onChange={changeColor} id={`${index}`} title={`Select color ${index + 1}`}></Form.Control>
                
                <Button className="p-2" variant="primary" onClick={addColor} data-index={`${index}`} aria-label={`Add color ${index + 1}`}>
                    <i className="bi bi-plus-lg" style={{fontSize:"1.5rem"}} data-index={`${index}`} alt="add color" aria-hidden="true"/>
                </Button>

                <Button className="p-2" variant={colors.length <= minNumColors ? "outline-danger" : "danger"} onClick={removeColor} data-index={`${index}`} aria-label={`Remove color ${index + 1}`} disabled={colors.length <= minNumColors}>
                    <i className="bi bi-dash-lg" style={{fontSize:"1.5rem"}} data-index={`${index}`} alt="remove color" aria-hidden="true"/>
                </Button>
            </InputGroup>
        </Col>
    }
    return <>
    <Row aria-hidden>
        <div><i className="bi bi-paint-bucket" style={{fontSize:"3rem"}} alt="palette icon"/></div>
    </Row>
    {colors.map(colorMap)}
</>
}

