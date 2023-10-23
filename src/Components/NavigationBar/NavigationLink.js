import { Link } from "react-router-dom";

export default function NavigationLink({children, to, onNavigationLinkClick, className}){
    return (<Link className={"text-decoration-none py-2 " + className} to={to} onClick={onNavigationLinkClick}>
        {children}
    </Link>)
}