export interface UserLogin {
  username: string;
  password: string;
  enterprise: string;
}

export interface Enterprise {
  name: string;
  logo: string;
  address: string;
  phoneNumber: string;
  id: string;
  createdOn: string;
  updatedAt?: string;
}
