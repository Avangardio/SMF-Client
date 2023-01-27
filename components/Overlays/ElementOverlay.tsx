import DefaultOverlay from "./Components/DefaultOverlay";
import {useEffect} from "react";

export default function ElementOverlay() {

    useEffect(() => {
        if (typeof window !== undefined) document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = 'visible'
        }
    })


    return (
        <>
            <DefaultOverlay/>
        </>
    )
}