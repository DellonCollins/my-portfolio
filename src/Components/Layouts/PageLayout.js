import { Container } from "react-bootstrap";

export default function PageLayout({children}) {
    return (<Container fluid className="page-layout h-100 d-flex flex-column">        
        {children}
    </Container>)
}