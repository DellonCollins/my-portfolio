import { Container, Row, Col} from "react-bootstrap";

export default function PageLayout({title, children}) {
    return (<Container className="page-layout h-100 d-flex flex-column ">        
        {children}
    </Container>)
}