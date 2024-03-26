import { Input } from '@chakra-ui/react'

interface InputGroupProps {
  label: string
  htmlFor: string
  inputType: string
  inputName: string
  inputId: string
  placeholder: string
}

export default function InputGroup(props: InputGroupProps) {
  return (
    <>
      <div className="flex flex-col justify-start w-96 mb-6">
        <label className="mb-4 text-base font-medium" htmlFor={props.htmlFor}>
          {props.label}
        </label>
        <Input
          isRequired={true}
          size="lg"
          focusBorderColor="#737171"
          type={props.inputType}
          placeholder={props.placeholder}
          name={props.inputName}
          id={props.inputId}
        />
      </div>
    </>
  )
}
