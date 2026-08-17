import { useState } from "react";
import { BookingData, FormErrors } from "@/types/booking";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  onSuccess: (data: BookingData) => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [errors, setErrors] = useState<FormErrors>({});

  const [loading, setLoading] = useState(false);

  const timeSlots = Array.from(
    { length: 11 },
    (_, index) => `${index + 12}:00`,
  );

  function validateName(value: string) {
    if (!value.trim()) {
      return "Введите имя";
    }

    if (value.trim().length < 2) {
      return "Минимум 2 символа";
    }

    return "";
  }

  function validatePhone(value: string) {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
      return "";
    }

    return "Введите номер в формате +7ХХХХХХХХХХ или 8ХХХХХХХХХХ";
  }

  function validateDate(value: string) {
    if (!value) {
      return "Выберите дату";
    }
    const selectedDate = new Date(value);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return "Дата не может быть раньше сегодняшнего дня";
    }

    return "";
  }

  function validateQuantity(value: number) {
    if (value < 1 || value > 12) {
      return "От 1 до 12 гостей";
    }
    return "";
  }

  function validateForm() {
    const newErrors: FormErrors = {
      name: validateName(name),
      phoneNumber: validatePhone(phoneNumber),
      date: validateDate(date),
      quantity: validateQuantity(quantity),
    };

    if (!time) {
      newErrors.time = "Выберите время";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  }

  function validateField(field: keyof FormErrors, value: string | number) {
    let error = "";

    switch (field) {
      case "name":
        error = validateName(value as string);
        break;

      case "phoneNumber":
        error = validatePhone(value as string);
        break;

      case "date":
        error = validateDate(value as string);
        break;

      case "time":
        if (!value) {
          error = "Выберите время";
        }
        break;

      case "quantity":
        error = validateQuantity(value as number);
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      onSuccess({
        name,
        phoneNumber,
        date,
        time,
        quantity,
      });
    }, 1500);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Имя гостя:</label>
        <input
          className={errors.name ? styles.inputError : styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              validateField("name", e.target.value);
            }
          }}
          onBlur={() => validateField("name", name)}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <label htmlFor="phoneNumber">Номер телефона:</label>
        <input
          className={errors.phoneNumber ? styles.inputError : styles.input}
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            if (errors.phoneNumber) {
              validateField("phoneNumber", e.target.value);
            }
          }}
          onBlur={() => validateField("phoneNumber", phoneNumber)}
        />
        {errors.phoneNumber && (
          <p className={styles.error}>{errors.phoneNumber}</p>
        )}

        <label htmlFor="date">Дата</label>
        <input
          className={errors.date ? styles.inputError : styles.input}
          type="date"
          id="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);

            if (errors.date) {
              validateField("date", e.target.value);
            }
          }}
          onBlur={() => validateField("date", date)}
        />
        {errors.date && <p className={styles.error}>{errors.date}</p>}

        <label htmlFor="time">Время</label>
        <select
          className={errors.time ? styles.inputError : styles.input}
          id="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);

            if (errors.time) {
              validateField("time", e.target.value);
            }
          }}
          onBlur={() => validateField("time", time)}
        >
          <option value="">Выберите время</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {errors.time && <p className={styles.error}>{errors.time}</p>}

        <label htmlFor="quantity">Количество гостей</label>
        <input
          className={errors.quantity ? styles.inputError : styles.input}
          type="number"
          id="quantity"
          min={1}
          max={12}
          value={quantity}
          onChange={(e) => {
            const value = Number(e.target.value);
            setQuantity(value);

            if (errors.quantity) {
              validateField("quantity", value);
            }
          }}
          onBlur={() => validateField("quantity", quantity)}
        />
        {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Бронирую..." : "Забронировать"}
        </button>
      </form>
    </>
  );
}
