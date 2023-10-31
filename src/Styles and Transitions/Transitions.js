import { useRef, cloneElement, Children } from "react";
import { CSSTransition } from "react-transition-group";

export function TransitionWrapper({children, enter = true, appear = true, timeout = 2000, classNames}){
    const childRefs = useRef()

    return <CSSTransition nodeRef={childRefs} in={enter} appear={appear} timeout={timeout} classNames={classNames}>
        {cloneElement(children, { ref: childRefs })}
    </CSSTransition>
}

export function CSSTransitionWrapper({children, enter = true, appear = true, timeout = 2000, classNames}){
    if(children.length > 1){ // if we have multiple children
        return Children.map(children, (child, index)  => {
            return <TransitionWrapper enter={enter} appear={appear} timeout={timeout} classNames={classNames}>
                {child}
            </TransitionWrapper>
        })
    } else {
        return <TransitionWrapper enter={enter} appear={appear} timeout={timeout} classNames={classNames}>
            {children}
        </TransitionWrapper>
    }
}
