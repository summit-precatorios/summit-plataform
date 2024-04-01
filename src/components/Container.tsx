import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-self-center items-center mt-8">
        {children}
      </div>
    </>
  )
}
