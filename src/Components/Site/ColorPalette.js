import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

const minNumColors = 2, defaultColor = "#000000", defaultColors = ["#ffffff", "#00ffff"];

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
        let newColors = [...colors], id = parseInt(event.target.id)
        newColors.splice(id + 1, 0, defaultColor)
        setColors(newColors)
    }
    const removeColor = (event) => {
        let newColors = [...colors], id = parseInt(event.target.id)
        newColors = newColors.filter((value, index) => index !== id)
        setColors(newColors)
    }


    const colorMap = (value, index, colorArray) => {
        return <InputGroup key={index}>
            <InputGroupText>Color {index + 1}</InputGroupText>
            <Form.Control type="color" value={value} onChange={changeColor} id={`${index}`}></Form.Control>
            <Button variant="outline-primary" onClick={addColor} id={`${index}`} >Insert Color</Button>
            <Button variant="outline-danger" onClick={removeColor} id={`${index}`} disabled={colors.length <= minNumColors}>Remove Color</Button>
        </InputGroup>
    }
    return <div>
        {
            colors.map(colorMap)
        }
    </div>
}

