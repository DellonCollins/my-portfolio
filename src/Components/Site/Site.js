import { Row } from "react-bootstrap";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";

const packages = [
    { text : "React", color : "#61DBFB", link : "https://react.dev"},
    { text : "Zustand", color : "#DDDDDD", link : "https://github.com/pmndrs/zustand"},
    { text : "Bootstrap", color : "#712cf9", link : "https://react-bootstrap.netlify.app"},
    { text : "Sass", color : "#CD6799", link : "https://sass-lang.com"},
    { text : "P5js", color : "#ed225d", link : "https://p5js.org"},
]

export default function Site(){
    return <PageLayout>
    <CSSTransitionWrapper classNames="fade">
        <Row className="pt-5">
            <PageTitle title="Site"/>
        </Row>
        <Row className="pt-5 px-md-5">
            <p className="font-peg heading"></p>
            <p className="ps-md-5 default-text fw-light">
                <span>This site was made using </span>
                { packages.map((pkg, index) => { return <>
                    <a className="fw-normal link-opacity-25 link-opacity-100-hover" key={index} href={pkg.link} target="_blank" rel="noreferrer" style={{color : pkg.color}}>
                        {pkg.text}
                    </a>
                    { index < packages.length-2 
                        ?   ", "
                        :   (index === packages.length-2 
                                ? ", and "
                                : ".")
                    }
                </>})}
            </p>
        </Row>
        <Row className="px-md-5 pb-3">
            <p className="font-peg heading">How the canvas works</p>
            <div className="ps-md-5 default-text fw-light">
                <p> The background is generative art inspired by flow fields. P5js is the package that controls the render.</p>
                <p> Under the screen is a grid of vectors. <a className="link-light" href="https://en.wikipedia.org/wiki/Perlin_noise" target="_blank" rel="noreferrer">Perlin noise</a> is used to generate the direction of the grid points. Perlin noise commonly used because it generates
                    random values that are correlated/influenced by nearby values. The lines drawn on the screen trace the path of particles as they 
                    are influenced by the grid. This results in smooth curves that tend to flow in one direction. The visual affect of this canvas is smiliar to flowing rivers,
                    magnetic fields, or strands of hair.
                </p>
            </div>
        </Row>
    </CSSTransitionWrapper>
    </PageLayout>
}