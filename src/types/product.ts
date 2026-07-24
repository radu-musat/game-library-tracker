export interface Product {
  name: string;
  price: number;
  platform: string;
  isPurchased: boolean;
  isMainQuest: boolean;
  id: string;
}

export interface Purchase {
  purchaseDate: string;
  items: Product[];
  totalCost: number;
  id: string;
}

export interface RecordState {
  records: Purchase[];
}
