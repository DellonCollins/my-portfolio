import { Link } from "react-router-dom";

export default function NavigationLink({children, to, className}){
    return (<Link className={"text-decoration-none py-2 " + className} to={to}>
        {children}
    </Link>)
}