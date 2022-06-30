import { useEffect, useRef } from "react";

export default function useScroll(parentRef, childrenRef, callback) {
    const observer = useRef();
    const tumbler = useRef('ON');

    const on = () => { tumbler.current = 'ON' }
    const off = () => { tumbler.current = 'OFF' }

    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0,
            childretCurrent: childrenRef.current
        };

        observer.current = new IntersectionObserver(([target]) => {
            if(tumbler.current === 'ON' && target.isIntersecting) {
                off()
                callback();
            }
        }, options);

        observer.current.observe(childrenRef.current);

        return function () {
            observer.current.unobserve(options.childretCurrent);
        };        

    }, [callback, childrenRef, parentRef]);

    return { on, off }
}