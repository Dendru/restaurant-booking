export type BookingData = {
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  quantity: number;
};

export interface FormErrors {
  name?: string;
  phoneNumber?: string;
  date?: string;
  time?: string;
  quantity?: string;
}
