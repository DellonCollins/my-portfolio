import { ReactP5Wrapper } from "@p5-wrapper/react"
import { useEffect, useRef, useState } from 'react'
import { flowField, Grid } from "./Points";

function sketch(p5){
    let width = 600, height = 400; let first = true;
    let pointsGrid;
    
    p5.setup = () => {
        p5.createCanvas(width, height);
    }

    p5.updateWithProps = (props) => {
        if (props.canvasWidth) {
            width = props.canvasWidth; 
            p5.resizeCanvas(width, height)
        } 
        if (props.canvasHeight) {
            height = props.canvasHeight
            p5.resizeCanvas(width, height)
        }
        if (props.canvasHeight || props.canvasWidth){
            pointsGrid = new Grid(width, height, p5, 20, 20)
        }
    };
    p5.draw = () => {
        p5.background(120);

        if(pointsGrid){
            pointsGrid.draw()
            flowField(pointsGrid, p5)
        }

        

    };
}



export function P5Canvas({container}) {
    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    })

    // Resize effect
    useEffect(() => {
        function handleResize() {
            let [width, height] = [container.current.clientWidth, container.current.clientHeight]
            setDimensions({width: width, height: height})
        }
        
        // Attach the event listener to the window object and initialize
        window.addEventListener('resize', handleResize)
        handleResize()

        // Remove the event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, []);

    // Dimension change effect
    useEffect(()=>{
        console.log(dimensions, container)
    }, [dimensions])
    
    return <ReactP5Wrapper className="test" sketch={sketch} canvasWidth={dimensions.width} canvasHeight={dimensions.height}/>
}