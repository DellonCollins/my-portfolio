import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions"
import PageLayout from "../Layouts/PageLayout"
import PageTitle from "../PageTitle"
import "./Home.scss"

export default function Home(){
    const bulletPoints = [
        { text : "Frontend Developer", to : "/site" },
        { text : "Computer Scientist", to : "/skills" },
        { text : "Artist", to : "/edit" }
    ]

    const details = (<div className="heading">
        { bulletPoints.map((value, index) => { return <CSSTransitionWrapper key={value.text} classNames="slide-left">
            <Link className="d-block font-peg text-end pb-5 link-light link-underline link-underline-opacity-0" 
                style={{transitionDelay: `${index * 200}ms`}} to={value.to} title={value.text}>
                {value.text}
            </Link>
        </CSSTransitionWrapper> }) }
    </div>)

    return <PageLayout>
            <CSSTransitionWrapper classNames="fade">
                <Row className="pt-5 h-100">
                    <Col xl={6}><PageTitle title="Dellon Collins"/></Col>
                    <Col xl className="mt-auto">{ details }</Col>   
                </Row>
            </CSSTransitionWrapper>
        </PageLayout> 
    
}