import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationLink from "./NavigationLink";

export default function NavigationBar(){
    const links = [
        { address : "home", name : "About Me" },
        { address : "skills", name : "Skills" },
        { address : "contact", name : "Contact" },
        { address : "site", name : "Site" },
    ]

    const renderNavigationLinks = () => {
        return links.map((link, index) => (<NavigationLink className="mx-0 mx-md-3 mx-lg-0" to={link.address} key={link.address} >
            <span className="nav-link">{link.name}</span>
        </NavigationLink>))
    }

    return <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
        <Container fluid className="h-100 px-3 px-md-5 px-lg-2">

            <NavigationLink to={"/home"}>
                <Navbar.Brand className="mx-lg-2">D. Collins</Navbar.Brand>
            </NavigationLink>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Navbar.Collapse className="justify-content-end my-auto w-100 px-4 px-lg-0 rounded-bottom flex-grow-0 text-center bg-body-tertiary" id="responsive-navbar-nav">
                <Nav>
                    {renderNavigationLinks()}
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>
}