export interface UserEntity {
  id: string;
  documentNumber: string;
  fullName: string;
  city: string;
  monthlyIncome: number;
  passwordHash: string;
  createdAt: Date;
}
