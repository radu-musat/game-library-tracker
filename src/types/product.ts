export interface Product {
  name: string;
  price: number;
  platform: string;
  purchaseDate?: string;
  isPurchased: boolean;
  isMainQuest: boolean;
  id: string;
}

export interface Purchase {
  items: Product[];
  totalCost: number;
  id: string;
}

export interface RecordState {
  records: Purchase[];
}
