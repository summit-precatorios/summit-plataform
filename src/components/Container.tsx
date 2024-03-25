import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <div className="p-8 h-full w-1/2 flex flex-col justify-start items-start mt-14 m-auto">
        {children}
      </div>
    </>
  )
}
