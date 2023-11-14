import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavigationLink({children, to, className}){
    const navigate = useNavigate()

    //use mousedown since the collapsible nav it is in triggers onblur after mousedown but before onclick
    return (<Link className={"d-flex d-md-block align-items-center justify-content-center text-decoration-none py-2 " + className} 
    to={to} onMouseDown={()=>navigate(to)} onClick={(e)=>e.preventDefault()}>
        {children}
    </Link>)
}