import type {LoaderFunction} from "remix"
import {useLoaderData} from "remix"
import {db} from "~/utils/db.server"
import type {Tenancy} from "@prisma/client"
import {Button, Card, Grid, Input, Spacer, Text, Textarea} from "@nextui-org/react"
import StandardInput from '~/components/StandardInput'


/** TODO  **/
export default function Portfolio() {
    // This is a remix hook that automatically loads data from serverside, aka the "loader" function below
    const tenancies = useLoaderData<Tenancy[]>()
    return (
        <>
            <Text h1 size={60} weight="bold"
                  css={{textGradient: '90deg, $green900 -20%, $green300 50%', textAlign: 'center'}}>
                Tenancies
            </Text>
            {tenancies?.map(tenancy =>
                <>
                    <Card color="primary">
                        <Spacer y={1.5}/>
                        <form method="post">
                            {/*Padding is set because the card already has padding, but the input lacks on top*/}
                            <Grid.Container gap={2} css={{padding: '10px 0px 0px 0px'}}>
                                <Grid xs={6}>
                                    <Input value={tenancy.address} labelPlaceholder="Address"
                                           fullWidth
                                           bordered
                                    />
                                </Grid>
                                <Grid>
                                    <StandardInput value={tenancy.rooms} labelPlaceholder="Rooms"/>
                                </Grid>
                                <Grid>
                                    <StandardInput value={tenancy.size} labelPlaceholder="Size (m2)"/>
                                </Grid>
                            </Grid.Container>
                        </form>
                    </Card>
                    <Spacer y={0.3}/>
                </>
            )}
            <Button>Add Tenancy</Button>
        </>
    )
}


export let loader: LoaderFunction = async () => db.tenancy.findMany()