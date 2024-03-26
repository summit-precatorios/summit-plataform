import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <div className="h-full w-1/2 flex flex-col justify-start items-start m-auto">
        {children}
      </div>
    </>
  )
}
