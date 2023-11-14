import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Contact from "../Contact/Contact"
import Home from "../Home/Home"
import Site from "../Site/Site"
import Skills from "../Skills/Skills"
import Edit from "../Edit/Edit"


export default function AppRouter(){
    const location = useLocation()
    useEffect(()=> {
        let l = location.pathname.substring(1)
        document.getElementsByTagName("title")[0].innerText = `${l} | .dc ( )`
    }, [location])
    
    return (<Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/skills" element={<Skills/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/site" element={<Site/>}/>
        <Route path="/edit" element={<Edit/>}/>
        <Route path="*" element={<Navigate to="/home"/>}></Route>
    </Routes>
    )
       
}