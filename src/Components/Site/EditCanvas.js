import { Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import ColorPalette from "./ColorPalette";

export default function EditCanvas(){
    return <div>
        <ColorPalette/>
        <InputGroup>
            <InputGroupText>Draw Duration</InputGroupText>
            <Form.Control type="number"></Form.Control>
        </InputGroup>
        <InputGroup>
            <InputGroupText>Draw Duration</InputGroupText>
            <Form.Control type="number"></Form.Control>
        </InputGroup>
    </div>
}