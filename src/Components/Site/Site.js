import { Row } from "react-bootstrap";
import PageLayout from "../Layouts/PageLayout";
import PageTitle from "../PageTitle";

export default function Site(){
    return <PageLayout>
        <Row className="pt-5">
            <PageTitle title="Site"/>
        </Row>
        
    </PageLayout>
}