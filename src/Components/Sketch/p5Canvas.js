import { ReactP5Wrapper } from "@p5-wrapper/react"
import { useEffect, useState } from 'react'
import { FlowGrid } from "./FlowField";
import { ParticleManager } from "./Particle";

function sketch(p5){
    let width = 600, height = 400; let first = true;
    let flowGrid;
    let particleManager;
    
    p5.setup = () => {
        p5.createCanvas(width, height);
        first = true
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
            flowGrid = new FlowGrid(width, height, p5, 15, 15)
            particleManager = new ParticleManager(flowGrid, 70)
        }
    };
    p5.draw = () => {
        if (first){
            p5.background(20);
        }
        if(flowGrid){
            // flowGrid.draw()
            particleManager.updateParticles(p5)
            particleManager.draw(p5)
            first = false;
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