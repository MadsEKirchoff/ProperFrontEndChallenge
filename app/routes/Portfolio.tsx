import type {LoaderFunction} from "remix"
import {ActionFunction, useLoaderData} from "remix"
import {db} from "~/utils/db.server"
import type {Tenancy} from "@prisma/client"
import {Button, Text} from "@nextui-org/react"
import EditableTenancy from '~/components/EditableTenancy'

/** TODO  **/
export default function Portfolio() {
    // This is a remix hook that automatically loads data from serverside, aka the "loader" function below
    const tenancies = useLoaderData<Tenancy[]>()
    return (
        <>
            <Text h1 size={60} weight="bold"
                  css={{textGradient: '90deg, $green900 -20%, $green300 50%', textAlign: 'center'}}>
                Portfolio
            </Text>
            {tenancies?.map(tenancy => <EditableTenancy key={tenancy.id} tenancy={tenancy}/>)}

            <Text h2>Add new tenancy</Text>
            <EditableTenancy/>
            <Button onClick={() => tenancies.push({
                id: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                address: '',
                size: '',
                rooms: '',
                description: '',
            })}>Save</Button>
        </>
    )
}


export let loader: LoaderFunction = async () => db.tenancy.findMany()

export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    const address = form.get("address")
    const rooms = form.get("rooms")
    const size = form.get("size")

    // we do this type check to be extra sure and to make TypeScript happy
    if (
        typeof address !== "string" ||
        typeof rooms !== "string" ||
        typeof size !== "string"
    ) {
        throw new Error(`Form not submitted correctly.`)
    }

    const fields = {
        address, rooms, size, description: 'Not Implemented'
    }

    const tenancy = await db.tenancy.create({data: fields})
    return tenancy
}
