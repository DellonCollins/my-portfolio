import { useState, useEffect } from "react";

export default function useDimensions(containerRef){
    console.log(containerRef)
    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        function handleResize() {
            let [width, height] = [containerRef.current.clientWidth, containerRef.current.clientHeight]
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

    return dimensions
}