// Vertical alignment large. Horizontal alignment when small
import { useRef } from 'react'
import { P5Canvas } from '../Sketch/p5Canvas'
import './Layout.scss'

export default function BaseAppLayout({children}){
    const contentRef = useRef()

    return <div className="base-layout w-100 d-flex flex-column flex-lg-row">
        <div className="navigation">{children[0]}</div>
        <div className="content d-grid flex-grow-1" ref={contentRef} >
            <P5Canvas className="test" container={contentRef}/>
            <div className="scroll-wrapper overflow-auto">{children[1]}</div>
        </div>
    </div>
}