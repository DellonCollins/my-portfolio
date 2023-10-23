import { Container, Row, Col} from "react-bootstrap";

export default function Skills(){
    const skillList = [
        {
            title : "Front End",
            items : [ "Node", "HTML / CSS / Sass", "React", "Angular"]
        },
        {
            title : "Back End",
            items : [ "MongoDB", "Express", "SQL" ]
        },
        {
            title : "Programming Languages",
            items : [ "Javascript/Typescript", "Java", "Python", "C#" ]
        },
        {
            title : "IT Experience",
            items : [ "ServiceNow", "SAP" ]
        }
    ]
    return (<Container>
        <Row className="mt-5 ml-lg-2"><h1 className="display-1 main-text">Skills</h1></Row>
        <Row className="pt-5 ps-5">
            { skillList.map(skill=> { return <Col lg={6} key={skill.title}> 
                <p className="h3 peg">{skill.title}</p>
                <div className="ps-4 py-2 secondary-text">
                    {skill.items.map(item=><p key={item}>{item}</p>)}
                </div>
            </Col>}) }
        </Row>
    </Container>)
}