import { Row, Col } from "react-bootstrap";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";
import "./Skills.scss"

export default function Skills(){
    const skillList = [
        {
            title : "Front End",
            items : [ "HTML / CSS / Sass",  "Node", "React", "Angular"]
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
    
    return (<PageLayout>
         <Row className="pt-5">
            <PageTitle title="Skills"/>
        </Row>
        <Row className="pt-5 ps-5">
            { skillList.map(skill=> { return <Col className="skill-column" lg="6" key={skill.title}> 
                <p className="h3 peg">{skill.title}</p>
                <div className="ps-4 py-2 secondary-text">
                    {skill.items.map(item=><p key={item}>{item}</p>)}
                </div>
            </Col>}) }
        </Row>
    </PageLayout>)
}