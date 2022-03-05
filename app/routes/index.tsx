import Portfolio from "~/routes/Portfolio";
import { createTheme, NextUIProvider } from "@nextui-org/react"

//Basic scaffolding. Index is the default route in a given folder in remix
const Index = (): JSX.Element => {
    return (
        <NextUIProvider theme={darkTheme}>
            <Portfolio />
        </NextUIProvider>
    );
}

// This is a tenant system for developers, dark mode is default
const darkTheme = createTheme({
    type: 'dark',
})


export default Index