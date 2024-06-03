import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn, processNumberMask } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

export function RegisterForm(props: {
  title: string
  description: string
  show: boolean
}) {
  const [processNumber, setProcessNumber] = useState('')
  const [date, setDate] = useState<Date>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleInputChange(event: any) {
    const { value } = event.target

    setProcessNumber(processNumberMask(value))
  }

  return (
    <Card className={`mt-16 ${props.show ? 'block' : 'hidden'}`}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="area">Órgão</Label>
            <Select defaultValue="default">
              <SelectTrigger id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Selecione</SelectItem>
                <SelectItem value="team">Procuradoria Geral</SelectItem>
                <SelectItem value="billing">Casa Civil</SelectItem>
                <SelectItem value="account">Ministério da Educação</SelectItem>
                <SelectItem value="deployments">
                  Secretaria de Segurança
                </SelectItem>
                <SelectItem value="support">
                  Supremo Tribunal Federal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="security-level">Origem</Label>
            <Select defaultValue="default">
              <SelectTrigger id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Selecione</SelectItem>
                <SelectItem value="federal">Federal</SelectItem>
                <SelectItem value="estadual">Estadual</SelectItem>
                <SelectItem value="municipal">Municipal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <Label htmlFor="security-level">Tribunal</Label>
            <Select defaultValue="default">
              <SelectTrigger id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Selecione</SelectItem>
                <SelectItem value="1">TRF-1</SelectItem>
                <SelectItem value="2">TRF-4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Número do Processo</Label>
            <Input
              id="subject"
              placeholder={`Informe o número do seu ${props.title === 'RPV' ? 'RPV' : 'precatório'}`}
              value={processNumber}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <Label htmlFor="subject">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-auto justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, 'PPP')
                  ) : (
                    <span>Data do {props.title}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Valor</Label>
            <Input
              id="price"
              placeholder="R$"
              // value={processNumber}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}
