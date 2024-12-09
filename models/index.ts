export type birthDate = {
  day: string;
  month: string;
  year: string;
};

export type AccountDetails = {
  gender: string;
  name: string;
  email: string;
  password: string;
  birthDate: birthDate;
  firstName: string;
  lastName: string;
  company: string;
  addressFirstLine: string;
  addressSecondLine: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  incorrectPassword: string;
};

export type ContactDetails = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ProductDetails = {
  availability: string;
  brand: string;
  category: string;
  condition: string;
  id: string;
  name: string;
  price: string;
};
