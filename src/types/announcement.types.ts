export type PaymentMethod = 'PIX' | 'TRANSFER_BANK';

export type CreateAnnouncementRequestData = {
  type: string;
  ownerFullName: string;
  ownerDocument: string;
  lawSuit: string;
  origin: string;
  court: string;
  price: string;
  salePrice: string;
  liquidBalance: string;
  paymentOption: PaymentMethod;
  pixKey?: string | undefined;
  ownerBankAccount?: string | undefined;
  documentBankAccount?: string | undefined;
  bankAccount?: string | undefined;
  agencyBankAccount?: string | undefined;
};

export type Announcement = {
  id: string;
  type: string;
  ownerFullName: string;
  ownerDocument: string;
  lawSuit: string;
  origin: string;
  court: string;
  price: string;
  salePrice: string;
  liquidBalance: string;
  paymentOption: PaymentMethod;
  status?: 'APROVED' | 'PENDENT' | 'REPROVED';
  createdAt?: string;
  pixKey?: string;
  ownerBankAccount?: string;
  documentBankAccount?: string;
  bankAccount?: string;
  agencyBankAccount?: string;
};
