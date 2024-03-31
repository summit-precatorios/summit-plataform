import { Input } from '@chakra-ui/react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputGroupProps {
  label: string
  htmlFor: string
  inputType: string
  inputName: string
  inputId: string
  placeholder: string
  register: UseFormRegister<FieldValues>
}

export default function InputGroup({
  htmlFor,
  inputId,
  inputType,
  label,
  placeholder,
  register,
  inputName,
}: InputGroupProps) {
  return (
    <>
      <div className="flex flex-col justify-start w-96 mb-4">
        <label className="mb-4 text-base font-medium" htmlFor={htmlFor}>
          {label}
        </label>
        <Input
          isRequired={true}
          size="lg"
          focusBorderColor="#737171"
          type={inputType}
          placeholder={placeholder}
          id={inputId}
          {...register(inputName)}
          textColor={'#737171'}
        />
      </div>
    </>
  )
}
