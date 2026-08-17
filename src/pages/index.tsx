import { useState } from "react";
import BookingForm from "@/components/BookingForm/BookingForm";
import ConfirmationScreen from "@/components/ConfirmationScreen/ConfirmationScreen";
import { BookingData } from "@/types/booking";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [booking, setBooking] = useState<BookingData | null>(null);

  if (booking) {
    return (
      <>
        <div className={styles.screen}>
          <ConfirmationScreen
            booking={booking}
            onReset={() => setBooking(null)}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.screen}>
        <BookingForm onSuccess={setBooking} />
      </div>
    </>
  );
}
