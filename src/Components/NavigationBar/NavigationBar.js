import { Collapse } from "bootstrap";
import { useCallback, useRef, } from "react";
import { Container, Nav, Navbar,  } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import NavigationLink from "./NavigationLink";

const links = [
    { address : "home", name : "Home" },
    { address : "skills", name : "Skills" },
    { address : "contact", name : "Contact" },
    { address : "site", name : "Site" },
    { address : "edit", name : "Modify" },

]

export default function NavigationBar(){
    const location = useLocation()
    const collapseRef = useRef()
    const bootstrapCollapse = useCallback(()=>{
        return collapseRef.current ? Collapse.getOrCreateInstance(collapseRef.current) : undefined
    }, [collapseRef])

    const close = () => {
        if(!bootstrapCollapse()) { return }
        bootstrapCollapse().hide()
    }

    const toggle = (e) => {
        if(!bootstrapCollapse()) { return }
        bootstrapCollapse().toggle()
    }

    const renderNavigationLinks = () => {
        return links.map((link) => (<NavigationLink className={"mx-0 mx-md-3 mx-lg-0 " + (location.pathname.includes(link.address) ? "fw-bold" : "")} to={link.address} key={link.address}>
            <span className="nav-link">{link.name}</span>
        </NavigationLink>))
    }

    return <Navbar collapseOnSelect expand="md" className="bg-body-tertiary" >
        <Container fluid className="h-100 px-3 px-md-5 px-lg-2">

            <NavigationLink to={"/home"}>
                <Navbar.Brand className="mx-lg-2 font-peg">D. Collins</Navbar.Brand>
            </NavigationLink>
            
            <button className="navbar-toggler" type="button" onBlur={close} onClick={toggle} 
                    data-toggle="collapse" data-target="#responsive-navbar-nav" aria-controls="responsive-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <Navbar.Collapse className="justify-content-end my-auto w-100 px-4 px-lg-0 rounded-bottom flex-grow-0 text-center bg-body-tertiary" id="responsive-navbar-nav" ref={collapseRef}>
                <Nav>
                    {renderNavigationLinks()}
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>
}