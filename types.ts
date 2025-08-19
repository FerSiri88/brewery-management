
export enum ProcessStatus {
  Fermenting = "Fermentando",
  Maturing = "Madurando",
  Ready = "Lista para envasar",
  Empty = "Vacío"
}

export interface Tank {
  id: string;
  beerType: string;
  volumeLiters: number;
  capacityLiters: number;
  status: ProcessStatus;
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}
