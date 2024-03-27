import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

interface PasswordInputProps {
  label: string
  htmlFor: string
  inputType: string
  inputName: string
  inputId: string
  placeholder: string
}

export default function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <>
      <div className="flex flex-col justify-start w-96 mb-4">
        <label className="mb-2 text-base font-medium" htmlFor={props.htmlFor}>
          {props.label}
        </label>
        <InputGroup size="lg" className="top-0">
          <Input
            size="lg"
            focusBorderColor="#737171"
            type={show ? 'text' : 'password'}
            placeholder={props.placeholder}
            name={props.inputName}
            id={props.inputId}
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
