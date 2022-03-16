import {Input} from '@nextui-org/react'

type StandardInputProps = {
    value: string,
    labelPlaceholder: string
}

/** A small input wrapper just to standardize border  **/
export default function StandardInput({value, labelPlaceholder}: StandardInputProps) {
    return <Input value={value} labelPlaceholder={labelPlaceholder} bordered  clearable/>
}