export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country?: {
    id: number;
    name: string;
  };
  role?: {
    id: number;
    name: string;
  };
}
