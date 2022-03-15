import {Link, LoaderFunction, Outlet, useLoaderData} from "remix"
import {createTheme} from "@nextui-org/react"
import {redirect} from "remix"

//Immediate redirect just to get a proper URL
export const loader: LoaderFunction = async () => redirect(`/portfolio`)

//Basic scaffolding. Index is the default route in a given folder in remix
export default function Index() {
    return (
        <>
            <Outlet/>
        </>
    )
}

