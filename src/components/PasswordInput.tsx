import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface PasswordInputProps {
  label: string
  htmlFor: string
  inputType: string
  inputName: string
  inputId: string
  placeholder: string
  register: UseFormRegister<FieldValues>
}

export default function PasswordInput({
  htmlFor,
  inputId,
  inputName,
  label,
  placeholder,
  register,
}: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <>
      <div className="flex flex-col justify-start w-96 mb-4">
        <label className="mb-2 text-base font-medium" htmlFor={htmlFor}>
          {label}
        </label>
        <InputGroup size="lg" className="top-0">
          <Input
            size="lg"
            focusBorderColor="#737171"
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            id={inputId}
            {...register(inputName)}
            required={true}
          />
          <InputRightElement width="4.5rem">
            <span onClick={handleClick} className="cursor-pointer">
              {show ? (
                <Visibility className="w-6 h-6 text-[#64748b]" />
              ) : (
                <VisibilityOff className="w-6 h-6 text-[#64748b]" />
              )}
            </span>
          </InputRightElement>
        </InputGroup>
      </div>
    </>
  )
}
