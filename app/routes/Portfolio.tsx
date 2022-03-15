import type {LoaderFunction} from "remix"
import {useLoaderData} from "remix"
import {db} from "~/utils/db.server"
import type {Tenancy} from "@prisma/client"
import {Button, Text} from "@nextui-org/react"

export default function Portfolio() {
    // This is a remix hook that automatically loads data from serverside, aka the "loader" function below
    const data = useLoaderData<Tenancy[]>();
    return (
        <>
            <Text h1 size={60} weight="bold" css={{textGradient: '90deg, $green900 -20%, $green200 50%'}}>Welcome Proper</Text>
            <form method="post">
                {data?.map(tenancy => tenancy.address)}</form>
            <Button>Add Tenancy</Button>
        </>
    )
}

export let loader: LoaderFunction = async () => db.tenancy.findMany()