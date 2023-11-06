import { Row, Col } from "react-bootstrap";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
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
        <CSSTransitionWrapper classNames="fade">
            <Row className="pt-5">
                <PageTitle title="Skills"/>
            </Row>
            <Row className="pt-5 px-5">
                { skillList.map(skill => { return <Col className="skill-column" md="6" key={skill.title}> 
                    <p className="font-peg heading">{skill.title}</p>
                    <div className="ps-5 py-2 default-text fw-light">
                        {skill.items.map((item, itemIndex) => <CSSTransitionWrapper classNames="fade" key={item}>
                            <p style={{transitionDelay:`${itemIndex*300}ms`}}>{item}</p>
                        </CSSTransitionWrapper>)}
                    </div>
                </Col>}) }
            </Row>
        </CSSTransitionWrapper>
    </PageLayout>)
}