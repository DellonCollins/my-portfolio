import { Row } from "react-bootstrap";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";
import EditCanvas from "./EditCanvas";

export default function Site(){
    return <PageLayout>
    <CSSTransitionWrapper classNames="fade">
        <Row className="pt-5">
            <PageTitle title="Site"/>
        </Row>
        <Row className="pt-5 px-md-5">
            <p className="font-peg heading"></p>
            <p className="ps-md-5 default-text fw-light">
                This site was made using <span className="fw-normal" style={{color:"#61DBFB"}}>React</span>,
                <span className="fw-normal" style={{color:"#712cf9"}}> Bootstrap</span>,
                <span className="fw-normal" style={{color:"#CD6799"}}> Sass</span>, and 
                <span className="fw-normal" style={{color:"#ed225d"}}> P5js</span> </p>
        </Row>
        <Row className="px-md-5">
            <p className="font-peg heading">How the canvas works</p>
            <div className="ps-md-5 default-text fw-light">
                <p> The background is generative art inspired by flow fields. </p>
                <p> Under the screen is a grid of vectors. Perlin noise is used to generate the direction of the grid points. Perlin noise commonly used because it generates
                    random values that are correlated/influenced by nearby values. The lines drawn on the screen trace the path of particles as they 
                    are influenced by the grid. This results in smooth curves that tend to flow in one direction. The visual affect of this canvas is smiliar to flowing
                    strands of hair.
                </p>
            </div>
        </Row>
        <Row className="px-md-5 pb-4">
            <p className="font-peg heading">Edit</p>
            <EditCanvas/>
        </Row>
    </CSSTransitionWrapper>
    </PageLayout>
}