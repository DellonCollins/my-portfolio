import { Row } from "react-bootstrap"
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

    const details = (<div>
        {bulletPoints.map(value => { return <p className="h3 peg py-lg-4 text-end" key={value}>{value}</p> })}
    </div>)

    return <PageLayout>
        <Row className="pt-5">
            <PageTitle title="Dellon Collins"/>
        </Row>
        <Row className="mt-auto mb-5">
            { details }
        </Row>
    </PageLayout> 
}

const getWindowDimensions = (screen) =>([screen.outerWidth, screen.outerHeight])