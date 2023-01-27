import '../styles/globals.css'
import NavBar from "../components/Navigation/NavBar";
import {SessionProvider} from "next-auth/react";
import {wrapper} from "../components/Redux/store";
import '../styles/stylesheet.sass'

function App({Component, pageProps: {session, ...pageProps}}: any) {
    return (
        <>
            <NavBar/>
            <SessionProvider session={session}>
                <Component {...pageProps}/>
            </SessionProvider>
        </>)
}

export default wrapper.withRedux(App);