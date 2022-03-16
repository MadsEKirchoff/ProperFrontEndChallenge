import {Button, Card, Grid, Input, Spacer} from '@nextui-org/react'
import {Tenancy} from '@prisma/client'
import StandardInput from '~/components/StandardInput'
import {Form, useSubmit, useTransition} from '@remix-run/react'
import {FormEvent} from 'react'

interface TenancyProps {
    tenancy: Tenancy
}

export default function TenancyDetails({tenancy}: TenancyProps) {
    const submit = useSubmit()
    const transition = useTransition()

    function deleteTenancy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // Clicking the button will also submit the form if not for this
        event.preventDefault()
        submit({delete: "true", id: tenancy.id}, {method: "post"})
    }

    function handleChange(event: FormEvent<HTMLFormElement>) {
        submit(event.currentTarget, {replace: true})
    }

    return <>
        <Card color="primary">
            <Spacer y={1.5}/>

            {/* Padding is set because the card already has padding, but the input lacks on top */}
            <Form method="post" onChange={handleChange}>
                <Grid.Container gap={2} css={{padding: '10px 0px 0px 0px'}}>
                    <Input name="id" value={tenancy?.id} type="hidden"/>
                    <Grid xs={5}>
                        <Input value={tenancy?.address} labelPlaceholder="Address" fullWidth bordered name="address"/>
                    </Grid>
                    <Grid xs={2}>
                        <StandardInput value={tenancy?.rooms} labelPlaceholder="Rooms" name="rooms"
                        />
                    </Grid>
                    <Grid xs={2}>
                        <StandardInput value={tenancy?.size} labelPlaceholder="Size (m2)" name="size"/>
                    </Grid>
                    <Grid>
                        <Button onClick={e => deleteTenancy(e)} color="error">
                            Delete
                        </Button>
                    </Grid>
                </Grid.Container>
            </Form>
        </Card>
        <Spacer y={0.3}/>
        {/*{transition.state === "submitting" ? (*/}
        {/*    <p>Saving...</p>*/}
        {/*) : null}*/}
    </>
}