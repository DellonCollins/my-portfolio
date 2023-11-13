
import { Row } from "react-bootstrap";
import { CSSTransitionWrapper } from "../../Styles and Transitions/Transitions";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";

const contacts = [
    { 
        name : "Email", link : "collins.dellon@gmail.com", 
        text : <>collins<wbr/>.dellon<wbr/>@gmail.com</>, email: true,
        icon : <i className="bi bi-envelope" style={{fontSize:"2rem"}} alt="envelope icon" aria-hidden="true"/>
    },
    { 
        name : "Github", link : "https://github.com/DellonCollins", 
        text : <>https://<wbr/>github.<wbr/>com/<wbr/>Dellon<wbr/>Collins</>,
        icon : <i className="bi bi-github" style={{fontSize:"2rem"}} alt="gitub icon" aria-hidden="true"/>
    }
]

const renderContacts = () => (
    contacts.map((contact, index) => {
        return <Row className="pt-5 px-2 px-md-5"  key={index}>
            <CSSTransitionWrapper classNames="fade" key={index}>
            <div style={{transitionDelay: `${index * 600}ms`}}>
                <p className="font-peg heading" >{contact.name}</p>
                <p className="d-flex ps-5 default-text fw-light text-wrap text-break">
                    {contact.icon}
                    <a className="ms-2 link-light link-underline-opacity-50 link-underline-opacity-100-hover my-auto" href={ contact.email ? "mailto:" + contact.link : contact.link } 
                        target="_blank" rel="noreferrer">
                        {contact.text}
                    </a>
                </p>
            </div>
            </CSSTransitionWrapper>
        </Row>
    })
)

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