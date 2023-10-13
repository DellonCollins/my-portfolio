import { ReactP5Wrapper } from "@p5-wrapper/react"
import { useEffect, useRef, useState } from 'react'
import { Grid } from "./Points";

function sketch(p5){
    let width = 600, height = 400;
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
            pointsGrid = new Grid(width, height, p5)
        }
    };
    p5.draw = () => {
        
        p5.background(120);
        // p5.normalMaterial();
        // p5.push();
        // p5.rotateZ(p5.frameCount * 0.01);
        // p5.rotateX(p5.frameCount * 0.01);
        // p5.rotateY(p5.frameCount * 0.01);
        // p5.plane(100);
        // p5.pop();
        if(pointsGrid){pointsGrid.draw()}
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