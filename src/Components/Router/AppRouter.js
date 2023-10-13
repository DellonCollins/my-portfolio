import { Navigate, Route, Routes } from "react-router-dom"
import Contact from "../Contact/Contact"
import Home from "../Home/Home"
import Site from "../Site/Site"
import Skills from "../Skills/Skills"

export default function AppRouter(){
    return (<Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/skills" element={<Skills/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/site" element={<Site/>}/>
        <Route path="*" element={<Navigate to="/home"/>}></Route>
    </Routes>
    )
       
}