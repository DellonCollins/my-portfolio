
import { Row } from "react-bootstrap";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";

export default function Contact(){
    return <PageLayout>
        <CSSTransitionWrapper classNames="fade">
            <Row className="pt-5">
                <PageTitle title="Contact"/>
            </Row>
            <Row className="pt-5 px-5">
                <p className="font-peg heading">Email</p>
                <p className="ps-5 default-text fw-light">collins.dellon@gmail.com</p>
            </Row>
        </CSSTransitionWrapper>
    </PageLayout>
}