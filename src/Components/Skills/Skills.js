import { Row, Col } from "react-bootstrap";
import IconWrapper from "../../Assets/Icons/IconWrapper";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";
import "./Skills.scss"

const skillList = [
    {
        title : "Front End",
        items : [ 
            { text : "HTML / CSS / Sass", icon : "html 5.png", alt : "HTML 5 Icon" },  
            { text : "Node", icon : "node-js.png", alt : "Node JS Icon"  }, 
            { text : "React", icon : "react.svg", alt : "React JS Icon"  }, 
            { text : "Angular", icon : "angular.svg", alt : "Angular Icon"  }]
    },
    {
        title : "Back End",
        items : [ 
            { text : "MongoDB", icon : "mongodb.svg", alt : "MongoDB Icon"  }, 
            { text : "Express", icon : "express-js.png", alt : "Express Icon"  }, 
            { text : "SQL", icon : "sql.svg", alt : "SQL Icon"  } ]
    },
    {
        title : "Programming Languages",
        items : [ 
            { text : "Javascript/Typescript", icon : "javascript.svg", alt : "Javascript Icon" }, 
            { text : "Java", icon : "java.svg", alt : "Java Icon"  }, 
            { text : "Python", icon : "python.svg", alt : "PythonPython Icon"  }, 
            { text : "C#", icon : "c-sharp.svg", alt : "C# Icon"  } ]
    },
    {
        title : "IT Experience",
        items : [ 
            { text : "ServiceNow", icon : "servicenow.svg", alt : "ServiceNow Icon"  }, 
            { text : "SAP", icon : "sap.svg", alt : "SAP Icon"  } 
        ]
    }
]

export default function Skills(){
    return (<PageLayout>
        <CSSTransitionWrapper classNames="fade">
            <Row className="pt-5">
                <Col md={4} className="d-flex justify-content-between align-items-center">
                    <PageTitle title="Skills"/>
                </Col>
                <Col className="d-flex align-items-center">
                    <a className="ps-3 w-auto d-flex align-items-center default-text link-light link-offset-1
                        link-opacity-75 link-opacity-100-hover
                        link-underline-opacity-0 link-underline-opacity-100-hover" 
                        style={{transition:"text-decoration-color 200ms ease, color 200ms ease", textDecorationThickness:"1px"}}
                        href="/Dellon Collins Resume.pdf" download title="Download Résumé"> 
                        <span>Résumé</span><i className="bi bi-file-text ps-2" style={{fontSize:"2rem"}} aria-hidden/>
                    </a>
                </Col>
            </Row>
            <Row className="pt-3 px-5">
                { skillList.map(skill => { return <Col className="skill-column" md="6" key={skill.title}> 
                    <p className="font-peg heading">{skill.title}</p>
                    <div className="ps-2 ps-md-5 py-2 default-text fw-light">
                        {skill.items.map((item, itemIndex) => <CSSTransitionWrapper classNames="fade" key={item + " " + itemIndex}>
                            <p style={{transitionDelay:`${itemIndex*300}ms`}}>
                                <IconWrapper resource={item.icon} height="42px" alt={item.alt}/>&nbsp;
                                {item.text}
                            </p>
                        </CSSTransitionWrapper>)}
                    </div>
                </Col>}) }
            </Row>
        </CSSTransitionWrapper>
    </PageLayout>)
}