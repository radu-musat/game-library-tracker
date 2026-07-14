export interface Product {
  name: string;
  price: number;
  platform: string;
  purchaseDate: string;
  isPurchased: false;
  isMainQuest: false;
  isSidequest: false;
}

export interface Purchase {
  items: Product[];
  totalCost: number
}

export interface RecordState {
  records: Purchase[]
}
