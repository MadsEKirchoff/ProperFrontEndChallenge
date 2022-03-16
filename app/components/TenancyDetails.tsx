import {Button, Card, Grid, Input, Spacer} from '@nextui-org/react'
import {Tenancy} from '@prisma/client'
import StandardInput from '~/components/StandardInput'
import {Form, useSubmit, useTransition} from '@remix-run/react'
import React, {useRef, useState} from 'react'

interface TenancyProps {
    tenancy: Tenancy
}

/* */
export default function TenancyDetails({tenancy}: TenancyProps) {
    // This approach doesn't scale well and should handled differently if there were more fields
    const [address, setAddress] = useState(tenancy.address)
    const [rooms, setRooms] = useState(tenancy.rooms)
    const [size, setSize] = useState(tenancy.size)
    const formRef = useRef(null)

    const submit = useSubmit()

    function deleteTenancy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // Clicking the button will also submit the form if not for this
        event.preventDefault()
        submit({delete: "true", id: tenancy.id}, {method: "delete", replace: true})
    }

    function persistUpdatedTenancy() {
        submit(formRef.current, {replace: true})
    }

    return <>
        <Card color="primary">
            <Spacer y={1.5}/>
            <Form method="post" ref={formRef}>

                {/* Padding is set because the card already has padding, but the input lacks on top */}
                <Grid.Container gap={2} css={{padding: '15px 0px 0px 0px'}}>
                    <Input name="id" value={tenancy?.id} type="hidden"/>
                    <Grid xs={5}>
                        <Input value={address} onChange={(newValue) => setAddress(newValue.target.value)}
                               labelPlaceholder="Address" fullWidth bordered name="address"
                               onBlur={persistUpdatedTenancy}/>
                    </Grid>
                    <Grid xs={2}>
                        <Input value={rooms} onChange={(newValue) => setRooms(newValue.target.value)}
                               labelPlaceholder="Rooms" fullWidth bordered name="rooms" onBlur={persistUpdatedTenancy}/>
                    </Grid>
                    <Grid xs={2}>
                        <Input value={size} onChange={(newValue) => setSize(newValue.target.value)}
                               labelPlaceholder="Size (m2)" fullWidth bordered name="size"
                               onBlur={persistUpdatedTenancy}/>
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
    </>
}