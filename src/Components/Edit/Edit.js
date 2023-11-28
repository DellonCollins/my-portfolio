import { Row } from "react-bootstrap";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";
import { ForwardEdit } from "./EditCanvas"; 

export default function Edit(){
    return <PageLayout>
        <CSSTransitionWrapper classNames="fade">
            <Row className="py-5">
                <PageTitle title="Edit"/>
            </Row> 
            <Row>
                <ForwardEdit/>
            </Row>
        </CSSTransitionWrapper>
    </PageLayout>
}