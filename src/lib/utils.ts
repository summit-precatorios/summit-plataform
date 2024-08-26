import { validate } from '@/lib/validate'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cpfMask(value: string) {
  return value
    ?.replace(/\D/g, '') // remove tudo que não é dígito
    ?.replace(/(\d{3})(\d)/, '$1.$2') // coloca ponto entre o terceiro e o quarto dígito
    ?.replace(/(\d{3})(\d)/, '$1.$2') // coloca ponto entre o sétimo e o oitavo dígito
    ?.replace(/(\d{3})(\d{1,2})/, '$1-$2') // coloca hífen entre o décimo primeiro e o décimo segundo dígito
    ?.replace(/(-\d{2})\d+?$/, '$1') // garante que só terá no máximo 14 caracteres
}

export function cnpjMask(value: string) {
  return value
    .replace(/\D/g, '')
    ?.replace(/(\d{2})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d)/, '$1/$2')
    ?.replace(/(\d{4})(\d)/, '$1-$2')
    ?.replace(/(-\d{2})\d+?$/, '$1')
}

export function pixKeysMask(value: string) {
  // debugger

  const cleanValue = removeMask(value).trim() // Remove máscara e espaços em branco

  // Verifica se contém caracteres não numéricos (para e-mails e chaves aleatórias)
  // if (/\D/.test(cleanValue)) {
  //   return value.trim() // Retorna a entrada original, já que pode ser um e-mail ou chave aleatória
  // }

  let formattedValue

  if (cleanValue.length === 11) {
    if (validate(cleanValue)) {
      formattedValue = cpfMask(cleanValue)
    } else {
      formattedValue = phoneMask(cleanValue)
    }
  } else if (cleanValue.length === 14) {
    formattedValue = cnpjMask(cleanValue)
  } else {
    formattedValue = cleanValue
  }

  return formattedValue
}

function removeMask(value: string) {
  if (/[a-zA-Z]/.test(value)) {
    // Se contém uma letra, aplica o regex para remover caracteres especiais
    return value.replace(/[/\s]/g, '')
  } else {
    // Caso contrário, aplica outro regex ou processamento
    return value.replace(/[()\-\s]/g, '')
  }
}

export function phoneMask(value: string) {
  return value
    .replace(/\D/g, '')
    ?.replace(/(\d{2})(\d)/, '($1) $2')
    ?.replace(/(\d{4,5})(\d{4})$/, '$1-$2')
}

export function processNumberMask(value: string) {
  // 5003007-08.2015.8.09.0051

  return value
    .replace(/^(\d{7})(\d)/, '$1-$2.') // 5003007-0.
    .replace(/^(\d{7}-\d{2})(\d)/, '$1.$2') // 5003007-08.2
    .replace(/^(\d{7}-\d{2}.\d{4})(\d)/, '$1.$2') // 5003007-08.2015.8
    .replace(/^(\d{7}-\d{2}.\d{4}.)(\d)/, '$1$2.') // 5003007-08.2015.8.
    .replace(/^(\d{7}-\d{2}.\d{4}.8.\d{2})(\d)/, '$1.$2.')
}

export const currencyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
