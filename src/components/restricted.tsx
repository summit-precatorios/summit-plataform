import { Button } from '@/components/ui/button'
import usePermission from '@/hooks/usePermission'

import { Permission } from '@/types'
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  to: Permission
  children: ReactNode
}

export function Restricted({ to, children }: Props) {
  const [loading, allowed] = usePermission(to)

  if (loading) return <h2>loading...</h2>

  if (allowed) return { children }

  return (
    <div className="text-center h-96 mt-10 m-auto max-sm:p-4 w-4/5">
      <h1 className="text-xl">
        Para anunciar seu precatório ou RPV, é necessário que sua conta esteja
        ativada.
      </h1>
      <Button variant={'default'} asChild className="mt-10 max-sm:w-full">
        <Link href="#" /** onClick={ () => handleClick(user!.document)} */>
          {/* {isLoading ? 'Ativando conta...' : 'Ativa conta'} */}
          Ativar conta
        </Link>
      </Button>
    </div>
  )
}

export default Restricted
