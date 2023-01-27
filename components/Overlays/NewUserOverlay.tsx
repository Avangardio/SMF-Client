import DefaultOverlay from "./Components/DefaultOverlay";
import Authentication from "../Auth/Authentication";
import Description from "./Description";


export default function NewUserOverlay() {

    return (
        <>
            <DefaultOverlay/>
            <Description/>
            <Authentication/>
        </>
    )
}