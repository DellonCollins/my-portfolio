
import { Row } from "react-bootstrap";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";

const contacts = [
    { name : "Email", value : "collins.dellon@gmail.com" },
    { name : "Github", value : "https://github.com/DellonCollins" },
]

const renderContacts = () => {
    return contacts.map((contact, index) => {
        return <Row className="pt-5 px-2 px-md-5" key={index}>
        <p className="font-peg heading">{contact.name}</p>
        <p className="ps-5 default-text fw-light text-wrap text-break">{contact.value}</p>
    </Row>
    })
}

export default function Contact(){
    return <PageLayout>
        <CSSTransitionWrapper classNames="fade">
            <Row className="pt-5">
                <PageTitle title="Contact"/>
            </Row>
            {renderContacts()}
        </CSSTransitionWrapper>
    </PageLayout>
}