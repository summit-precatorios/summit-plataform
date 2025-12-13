/**
 * Valida se um CPF (documento) é válido.
 *
 * @param {string} cpf - String contendo o CPF a ser validado, com ou sem formatação.
 * @returns {boolean} Retorna true se o valor informado  for um CPF válido ou falso caso contrário.
 */
export function isCPFValid(cpf: string): boolean {
  // Verifica se o parâmetro é uma string
  if (typeof cpf !== 'string') return false;

  // Remove todos os caracteres não numéricos do CPF
  const cleanedCpf = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF tem 11 dígitos ou se é uma sequência repetida
  if (cleanedCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanedCpf)) return false;

  // Converte a string em um array de números
  const cpfArray = cleanedCpf.split('').map(Number);

  // Extrai os dois últimos dígitos de verificação
  const verifierDigits = cpfArray.slice(9);

  // Função auxiliar para calcular os dígitos verificadores
  const calculateVerifierDigit = (length: number): number => {
    const sum = cpfArray
      .slice(0, length)
      .reduce((acc, digit, index) => acc + digit * (length + 1 - index), 0);

    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  // Calcula e valida o primeiro dígito verificador
  const firstVerifierDigit = calculateVerifierDigit(9);
  if (firstVerifierDigit !== verifierDigits[0]) return false;

  // Calcula e valida o segundo dígito verificador
  const secondVerifierDigit = calculateVerifierDigit(10);
  if (secondVerifierDigit !== verifierDigits[1]) return false;

  return true;
}
