import type {LoaderFunction} from "remix"
import {ActionFunction, useLoaderData} from "remix"
import {db} from "~/utils/db.server"
import type {Tenancy} from "@prisma/client"
import {Button, Text} from "@nextui-org/react"
import TenancyDetails from '~/components/TenancyDetails'
import {useSubmit} from '@remix-run/react'

/** TODO  **/
export default function Portfolio() {
    // This is a remix hook that automatically loads data from serverside, aka the "loader" function below
    const tenancies = useLoaderData<Tenancy[]>()
    // And this one is used when manually saving. Is not necessary when a submit on a form can be done
    const submit = useSubmit()

    function createNew() {
        submit({address: '', rooms: '', size: ''}, {method: "post"})
    }

    return (
        <>
            <Text h1 size={60} weight="bold"
                  css={{textGradient: '90deg, $green900 -20%, $green300 50%', textAlign: 'center'}}>
                Portfolio
            </Text>
            <Button onClick={createNew}>Add new tenancy</Button>
            <Text h2>Tenancies</Text>

            {tenancies?.map(tenancy =>
                <TenancyDetails key={tenancy.id} tenancy={tenancy}/>)}

        </>
    )
}


export let loader: LoaderFunction = async () => db.tenancy.findMany({orderBy: [{createdAt: 'desc'}]})

// Create, Update and Delete backend in one. Slightly hacky way to support our "actually" one page SPA
export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()

    const deleteTenancy = form.get("delete")
    const existingId = form.get("id")

    if (deleteTenancy) {
        if (typeof existingId === "string")
            return await db.tenancy.delete({where: {id: existingId}})
        else
            throw new Error(`Form not submitted correctly.`)
    }

    const address = form.get("address")
    const rooms = form.get("rooms")
    const size = form.get("size")

    // we do this type check to be extra sure and to make TypeScript happy
    if (
        typeof address !== "string" ||
        typeof rooms !== "string" ||
        typeof size !== "string"
    )
        throw new Error(`Form not submitted correctly.`)

    const fields = {address, rooms, size, description: 'Not Implemented'}

    if (typeof existingId === "string")
        return await db.tenancy.update({where: {id: existingId}, data: fields})
    else
        return await db.tenancy.create({data: fields})
}
