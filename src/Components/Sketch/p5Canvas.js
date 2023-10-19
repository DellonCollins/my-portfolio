import { ReactP5Wrapper } from "@p5-wrapper/react"
import { useEffect, useState } from 'react'
import { FlowGrid } from "./FlowField";
import { quadratic } from '@rojo2/interpolation'
import { ParticleManager } from "./Particle";

function sketch(p5){
    let width = 600, height = 400; let shouldRenderBackground = true;
    let flowGrid;
    let particleManager;
    
    p5.setup = () => {
        p5.createCanvas(width, height);
        shouldRenderBackground = true
    }

    p5.updateWithProps = function (props){
        if (props.canvasWidth) {
            width = props.canvasWidth; 
        } 
        if (props.canvasHeight) {
            height = props.canvasHeight
        }

        if (props.canvasHeight || props.canvasWidth) {
            shouldRenderBackground = true
            p5.resizeCanvas(width, height)
            flowGrid = instantiateFlowGrid(width, height, p5)
            particleManager = instantiateParticleManager(flowGrid, p5)
        }
    };
    p5.draw = () => {
        if (shouldRenderBackground) {
            p5.background(20);
        }
        if (flowGrid) {
            particleManager.updateParticles()
            particleManager.draw(p5)
            if(p5.frameCount % 2000 === 0 ){
                flowGrid.setFlowValues(p5)
            }
            shouldRenderBackground = false;
        }
    };
}

function instantiateFlowGrid(width, height, canvas){
    let area = Math.sqrt(width * height)
    let gridScale = area / 30
    let halfPerimeter = width + height

    let xSpaces = gridScale * (width/halfPerimeter), ySpaces = gridScale * (height/halfPerimeter)
    xSpaces = Math.floor(xSpaces)
    ySpaces = Math.floor(ySpaces)
    console.log("grid points: x %i, y %i", xSpaces, ySpaces)
    
    return new FlowGrid(width, height, canvas, xSpaces, ySpaces)
}

function instantiateParticleManager(flowGrid, canvas){
    let scale = 0.6   
    let normalizedArea = Math.sqrt(flowGrid.width * flowGrid.height)
    normalizedArea  = canvas.map(normalizedArea, 300, 1920, 0, 1)
    
    let numParticles = Math.floor(quadratic(normalizedArea, 300, 450, 800))
    console.log("area %f\nnum particles %i", normalizedArea, numParticles)
    return new ParticleManager(flowGrid, numParticles)
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