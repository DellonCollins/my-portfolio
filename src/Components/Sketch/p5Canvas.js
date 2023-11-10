import { ReactP5Wrapper } from "@p5-wrapper/react"
import { FlowGrid } from "./FlowField";
import { quadratic } from '@rojo2/interpolation'
import { ParticleManager } from "./Particle";
import { useLocation } from "react-router-dom";
import TimerWithPause from "../../Util/TimerWithPause";
import { useDimensions, useReload, useVisibility } from "../../Util/CustomHooks";
import useCanvasStore from "../../Store/CanvasStore";

const DrawMode = {
    draw : 0, fade : 1
}

var backgroundColor = 10
var fadeDuration = 5 * 1000, drawDuration = 18 * 1000, gridDensity = 1, particleDensity = 1, chaos;
var setupHasRan = false

function sketch(p5){
    let saveSwitch = false, resetSwitch = false
    let width = 600, height = 400, pathname, isHidden = false; 
    let shouldRenderBackground = true;
    let flowGrid, particleManager;
    let drawMode = DrawMode.draw
    let drawTimeout, fadeTimeout, fadeStartTime

    function resetRenderTiming(){
        drawMode = DrawMode.draw
        if(fadeTimeout) { fadeTimeout.pause() }
        if(drawTimeout) { drawTimeout.pause() }
        fadeTimeout = undefined
        drawTimeout = undefined
    }

    function initializeFlowField() {
        shouldRenderBackground = true
        flowGrid = instantiateFlowGrid(width, height, p5)
        particleManager = instantiateParticleManager(flowGrid, p5)
        resetRenderTiming()
    }

    p5.setup = () => {
        // appears to be a race condition in p5 js that makes setup run twice. this prevents that
        if (setupHasRan) { return }

        p5.createCanvas(width, height);
        setupHasRan = true
        shouldRenderBackground = true
    }

    p5.updateWithProps = function (props){
        let shouldReinitialize = false
        if (props.canvasHeight !== height || props.canvasWidth !== width) {
            height = props.canvasHeight ?  props.canvasHeight :  height
            width = props.canvasWidth ?  props.canvasWidth :  width
            p5.resizeCanvas(width, height)
            shouldReinitialize = true
        }
        
        if (props.pathname && pathname !== props.pathname){
            pathname = props.pathname
            shouldReinitialize = true
        }  
        
        if(props.hidden !== isHidden){
            isHidden =  props.hidden
            if(isHidden){
                if(fadeTimeout) { fadeTimeout.pause() }
                if(drawTimeout) { drawTimeout.pause() }
            } else {
                if(fadeTimeout) { fadeTimeout.resume() }
                if(drawTimeout) { drawTimeout.resume() }
            }
        }

        if(props.pageReloaded){
            if(fadeTimeout) { fadeTimeout.pause() }
            if(drawTimeout) { drawTimeout.pause() }
        }

        if(props.drawDuration && drawDuration !== props.drawDuration) { drawDuration = props.drawDuration * 1000 }

        if(props.gridDensity && gridDensity !== props.gridDensity) { gridDensity = props.gridDensity }
        
        if(props.particleDensity && particleDensity !== props.particleDensity) { particleDensity = props.particleDensity } 

        if(props.chaos && chaos !== props.chaos) { chaos = props.chaos }

        if(props.saveSwitch !== undefined && props.saveSwitch !== saveSwitch) {
            saveSwitch = props.saveSwitch
            p5.saveCanvas("flow field canvas")
        }

        if(props.resetSwitch !== undefined && props.resetSwitch !== resetSwitch) {
            resetSwitch = props.resetSwitch
            shouldReinitialize = true
        }

        if(shouldReinitialize){ initializeFlowField() }
    }

    p5.draw = () => {
        if (drawMode === DrawMode.draw) {
            // set the timer only if it has not been started
            if(!drawTimeout) {
                drawTimeout = new TimerWithPause(() => {
                    // at the end of the timer transition to fading the canvas
                    drawTimeout = undefined
                    drawMode = DrawMode.fade
                }, drawDuration)
            }

            // Draw logic
            if (shouldRenderBackground) {
                p5.clear()
                p5.background(backgroundColor);
                
            }
            if (flowGrid) {
                particleManager.updateParticles()
                particleManager.draw(p5, JSON.parse(sessionStorage.getItem("colors")) || undefined)
                if(p5.frameCount % 2000 === 0 ){
                    flowGrid.setFlowValues(p5)
                }
                shouldRenderBackground = false;
            }
        } else if (drawMode === DrawMode.fade) {
            // set the timer only if it has not been started
            if(!fadeTimeout) {
                fadeStartTime = Date.now()
                fadeTimeout = new TimerWithPause(() => {
                    initializeFlowField()
                }, fadeDuration)
            }

            // Fade logic
            p5.push()
            p5.noStroke()
            let progress = (Date.now() - fadeStartTime) / (fadeDuration)
            p5.fill(p5.color(backgroundColor, 255 * progress / 15))
            p5.rect(0, 0, width, height)
            p5.pop()
        }
    }
}

function instantiateFlowGrid(width, height, canvas){
    let area = Math.sqrt(width * height)
    let gridScale = area / 30 * gridDensity
    let halfPerimeter = width + height

    let xSpaces = gridScale * (width/halfPerimeter), ySpaces = gridScale * (height/halfPerimeter)
    xSpaces = Math.floor(xSpaces)
    ySpaces = Math.floor(ySpaces)
    // console.log("grid points: x %i, y %i", xSpaces, ySpaces)
    
    return new FlowGrid(width, height, canvas, xSpaces, ySpaces, chaos)
}

function instantiateParticleManager(flowGrid, canvas){ 
    let normalizedArea = Math.sqrt(flowGrid.width * flowGrid.height)
    normalizedArea  = canvas.map(normalizedArea, 300, 1920, 0, 1)
    
    let numParticles = Math.floor(quadratic(normalizedArea, 300, 800, 1100) / 2) * particleDensity
    // console.log("area %f, num particles %i", normalizedArea, numParticles)
    return new ParticleManager(flowGrid, numParticles)
}

export function P5Canvas({container}) {
    const dimensions =  useDimensions(container)
    const urlLocation = useLocation()
    const hidden = useVisibility()
    const reloadInitiated = useReload()
    const gridDensity = useCanvasStore(state=>state.gridDensity)
    const particleDensity = useCanvasStore(state=>state.particleDensity)
    const drawDuration = useCanvasStore(state=>state.drawDuration)
    const chaos = useCanvasStore(state=>state.chaos)
    const saveSwitch = useCanvasStore(state=>state.saveSwitch)
    const resetSwitch = useCanvasStore(state=>state.resetSwitch)

    return <ReactP5Wrapper sketch={sketch} canvasWidth={dimensions.width} canvasHeight={dimensions.height} 
        pathname={urlLocation.pathname} hidden={hidden} pageReloaded={reloadInitiated} 
        gridDensity={gridDensity} drawDuration={drawDuration} saveSwitch={saveSwitch} resetSwitch={resetSwitch} particleDensity={particleDensity} chaos={chaos}/>
}