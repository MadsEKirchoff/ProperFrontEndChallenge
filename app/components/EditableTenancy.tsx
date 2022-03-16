import {Card, Grid, Input, Spacer} from '@nextui-org/react'
import {Tenancy} from '@prisma/client'
import StandardInput from '~/components/StandardInput'
import {Form, useSubmit, useTransition} from '@remix-run/react'
import {FormEvent} from 'react'

interface TenancyProps {
    tenancy?: Tenancy
}

export default function EditableTenancy({tenancy}: TenancyProps) {
    const submit = useSubmit()
    const transition = useTransition()

    function handleChange(event: FormEvent<HTMLFormElement>) {
        submit(event.currentTarget, {replace: true})
    }

    return <>
        <Card color="primary">
            <Spacer y={1.5}/>
            <Form method="post" onChange={(e) => handleChange(e)}>

                <Input name="id" value={tenancy?.id} type="hidden"/>
                {/*Padding is set because the card already has padding, but the input lacks on top*/}
                <Grid.Container gap={2} css={{padding: '10px 0px 0px 0px'}}>
                    <Grid xs={6}>
                        <Input value={tenancy?.address} labelPlaceholder="Address" fullWidth bordered name="address"/>
                    </Grid>
                    <Grid>
                        <StandardInput value={tenancy?.rooms} labelPlaceholder="Rooms" name="rooms"
                        />
                    </Grid>
                    <Grid>
                        <StandardInput value={tenancy?.size} labelPlaceholder="Size (m2)" name="size"/>
                    </Grid>
                </Grid.Container>

            </Form>
        </Card>
        <Spacer y={0.3}/>
        {transition.state === "submitting" ? (
            <p>Saving...</p>
        ) : null}
    </>
}