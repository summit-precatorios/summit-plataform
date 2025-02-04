import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CircleHelp } from 'lucide-react'

interface Props {
  content: string
  handleClick?: () => Promise<void>
}

export function ToolTipHelper({ content, handleClick }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <CircleHelp
              size={16}
              className="ml-1 cursor-pointer text-red-300"
            />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-transparent">
          <span>{content}</span>
          {handleClick && (
            <Button
              className="bg-transparent"
              variant="ghost"
              onClick={() => {
                handleClick()
              }}
            >
              test
            </Button>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
