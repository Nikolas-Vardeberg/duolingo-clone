import dynamic from "next/dynamic"

const App = dynamic(() => import("./app"), { ssr: false});

const page = () => {
    return(
        <App />
    )
}

export default page