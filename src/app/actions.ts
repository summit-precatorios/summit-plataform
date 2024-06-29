'use server'

export function calculateSettlement(saleAmount: number): number {
  const maintenanceDiscount = 0.05
  const settlementAmount = saleAmount * (1 - maintenanceDiscount)

  return settlementAmount
}
