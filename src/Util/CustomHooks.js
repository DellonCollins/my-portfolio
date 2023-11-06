import { useEffect, useState } from "react";

export function useDimensions(container, isRef = true, getter = (e) => [e.clientWidth, e.clientHeight]){
    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        function handleResize() {
            let element = isRef ? container.current : container
            let [width, height] = getter(element)
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

export function useVisibility() {
    const [visibility, setVisibility] = useState()

    useEffect(()=> {
        const visibilityListener = (event) => { 
            setVisibility(document.hidden)
        }

        window.addEventListener("visibilitychange", visibilityListener,);
        return () => {
            window.removeEventListener("visibilitychange", visibilityListener)
        }
    }, [])

    return visibility
}

export function useReload() {
    const [reloadTriggered, setReloadTriggered] = useState(false)

    useEffect(()=> {
        const reloadListener = (event) => { 
            console.log("reload")
            setReloadTriggered(true)
        }

        window.addEventListener("beforeunload", reloadListener,);
        return () => {
            window.removeEventListener("beforeunload", reloadListener)
        }
    }, [])

    return reloadTriggered
}