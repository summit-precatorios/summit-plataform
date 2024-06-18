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

export function processNumberMask(value: string) {
  // 5003007-08.2015.8.09.0051

  return value
    .replace(/^(\d{7})(\d)/, '$1-$2.') // 5003007-0.
    .replace(/^(\d{7}-\d{2})(\d)/, '$1.$2') // 5003007-08.2
    .replace(/^(\d{7}-\d{2}.\d{4})(\d)/, '$1.$2') // 5003007-08.2015.8
    .replace(/^(\d{7}-\d{2}.\d{4}.)(\d)/, '$1$2.') // 5003007-08.2015.8.
    .replace(/^(\d{7}-\d{2}.\d{4}.8.\d{2})(\d)/, '$1.$2.')
}
