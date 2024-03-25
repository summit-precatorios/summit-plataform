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
      <div className="flex flex-col justify-start w-96 mb-4">
        <label className="mb-2 text-base font-medium" htmlFor={props.htmlFor}>
          {props.label}
        </label>
        <input
          className="h-12 rounded-lg px-3 py-4 border-solid border-gray-200 border-[1px] focus:outline-slate-500 "
          type={props.inputType}
          placeholder={props.placeholder}
          name={props.inputName}
          id={props.inputId}
        ></input>
      </div>
    </>
  )
}
