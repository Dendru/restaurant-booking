import { BookingData } from "@/types/booking";
import styles from "./ConfirmationScreen.module.css";

interface ConfirmationScreenProps {
  booking: BookingData;
  onReset: () => void;
}

export default function ConfirmationScreen({
  booking,
  onReset,
}: ConfirmationScreenProps) {
  return (
    <div className={styles.container}>
      <h1>Бронирование подтверждено</h1>
      <div className={styles.info}>
        <p>
          <strong>Имя:</strong> {booking.name}
        </p>

        <p>
          <strong>Дата:</strong> {booking.date}
        </p>

        <p>
          <strong>Время</strong> {booking.time}
        </p>

        <p>
          <strong>Количество гостей</strong> {booking.quantity}
        </p>
      </div>

      <button onClick={onReset}>Забронировать еще</button>
    </div>
  );
}
