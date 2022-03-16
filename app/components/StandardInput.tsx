import {Input} from '@nextui-org/react'

type StandardInputProps = {
    value?: string,
    labelPlaceholder: string,
    name: string
}

/** A small input wrapper just to standardize border  **/
export default function StandardInput({value, labelPlaceholder, name}: StandardInputProps) {
    return <Input value={value} labelPlaceholder={labelPlaceholder} name={name} bordered clearable/>
}