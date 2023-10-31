import { Col, Row } from "react-bootstrap"
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions"
import PageLayout from "../Layouts/PageLayout"
import PageTitle from "../PageTitle"
import "./Home.scss"

export default function Home(){
    // const dimension = useDimensions(window, false, getWindowDimensions)
    const bulletPoints = [
        "Frontend Developer",
        "Computer Scientist",
        "Musician"
    ]

    const details = (<div className="heading">
        {bulletPoints.map((value, index) => { return <CSSTransitionWrapper key={value} classNames="slide-left">
            <p className="font-peg text-end" style={{transitionDelay: `${index * 200}ms`}}>{value}</p>
        </CSSTransitionWrapper> })}
    </div>)

    return <PageLayout>
            <CSSTransitionWrapper classNames="fade">
                <Row className="pt-5 h-100">
                    <Col xl={8}><PageTitle title="Dellon Collins"/></Col>
                    <Col xl className="mt-auto">{ details }</Col>   
                </Row>
            </CSSTransitionWrapper>
        </PageLayout> 
    
}

const getWindowDimensions = (screen) =>([screen.outerWidth, screen.outerHeight])