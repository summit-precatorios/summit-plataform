'use client'

import usePermission from '@/hooks/usePermission'

import { Permission } from '@/types'
import { ReactNode } from 'react'

type Props = {
  to: Permission
  children: ReactNode
  fallback?: JSX.Element | string
}

/**
 * Componente `Restricted`
 *
 * Este componente é usado para restringir o acesso ao conteúdo com base em permissões específicas.
 * Ele utiliza o hook `usePermission` para determinar se o usuário tem a permissão necessária para acessar o conteúdo.
 *
 * @module Restricted
 *
 * @param {Object} props - Propriedades do componente.
 * @param {Permission} props.to - A permissão necessária para acessar o conteúdo.
 * @param {ReactNode} props.children - O conteúdo a ser exibido caso o acesso seja permitido.
 *
 * @returns {JSX.Element}
 * Retorna:
 * - Um componente de carregamento (`<h2>loading...</h2>`) enquanto verifica as permissões.
 * - O conteúdo filho (`children`) se o usuário tiver permissão.
 * - Um aviso e um botão para ativar a conta se o acesso for negado.
 *
 * @example
 * // Exemplo de uso
 * import { Restricted } from '@/components/Restricted';
 * import { Permission } from '@/types';
 *
 * function MyComponent() {
 *   return (
 *     <Restricted to={Permission.ADMIN}>
 *       <p>Conteúdo restrito para administradores</p>
 *     </Restricted>
 *   );
 * }
 *
 * @dependencies
 * - `usePermission`: Um hook para verificar permissões.
 * - `Button`: Um componente de botão.
 * - `Link`: Um componente para navegação.
 *
 * @notes
 * - A mensagem exibida na tela para usuários sem permissão pode ser customizada no código.
 * - O botão "Ativar conta" atualmente não tem funcionalidade implementada, mas pode ser configurado usando um callback via `onClick`.
 *
 * @repository
 * - GitHub: [Permission Provider](https://github.com/francois-roget/permission-provider-demo/tree/master)
 *
 * @article
 * - Explicação detalhada da implementação: [How to conditionally render React UI based on user permissions](https://medium.com/geekculture/how-to-conditionally-render-react-ui-based-on-user-permissions-7b9a1c73ffe2)
 */

export function Restricted({ to, children, fallback }: Props) {
  const [loading, allowed] = usePermission(to)

  if (loading)
    return (
      <div className="text-center h-96 mt-10 m-auto max-sm:p-4 w-4/5">
        {/* <h1 className="text-xl">Carregando...</h1> */}
      </div>
    )
  if (allowed) return <>{children}</>

  return <>{fallback}</>
}
