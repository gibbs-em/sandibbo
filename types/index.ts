export interface SandwichSpot {
  id: number;
  name: string;
  address: string;
  description?: string;
  rating: number;
  created_at?: Date;
}

export interface ApiError {
  message: string;
} 