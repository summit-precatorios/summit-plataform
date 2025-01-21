import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Scale } from 'lucide-react'

interface SidebarProps {
  className: string | undefined
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Seus Títulos
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Scale size={20} className="mr-2" color="#67da6f" />
              Precatórios
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Scale size={20} className="mr-2" color="#c3ea57" />
              RPVs
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Explorar
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Notícias
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
