import { useCallback, useEffect, useState } from "react";

const storageName = 'isLoad';

export default function useLoad() {
    const [isLoad, setIsLoad] = useState(undefined);

    const load = useCallback(() => {
        setIsLoad(true);
        localStorage.setItem(storageName, JSON.stringify(true));
    }, []);

    const clear = useCallback(() => {     
        setIsLoad(false);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if(data) { setIsLoad(true); }
        else { setIsLoad(false); }

    }, []);

    return { load, clear, isLoad };
}