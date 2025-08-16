import { Suspense, lazy } from "react";
import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Button from "./components/Button/Button";
import MainLayout from "./components/layout/MainLayout";
import Users from "./services/users/Users";
import Modal from "./components/Modal/Modal";
import Tabs from "./components/Tabs/Tabs";
import NotFoundPage from "./pages/Home/NotFoundPage";
import PageTitleUpdate from "./pages/Home/PageTitleUpdate";

const Home = lazy(() => import("./pages/Home/Home"));
const Authors = lazy(() => import("./pages/Home/Authors"));
const Books = lazy(() => import("./pages/Home/Books"));
const User = lazy(() => import("./pages/Home/User"));

// Імпортуємо інтерфейс User з нового файлу
import type { User } from "./types/types";

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: {
//       lat: string;
//       lng: string;
//     };
//   };
//   phone: string;
//   website: string;
//   company: {
//     name: string;
//     catchPhrase: string;
//     bs: string;
//   };
// }

const tabData = [
  {
    label: "Вкладка 1",
    content: <div>Вміст першої вкладки.</div>,
  },
  {
    label: "Вкладка 2",
    content: <div>Вміст другої вкладки.</div>,
  },
  {
    label: "Вкладка 3",
    content: <div>Вміст третьої вкладки.</div>,
  },
];

interface Color {
  label: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const color = [{ label: "red" }, { label: "green" }, { label: "blue" }];

function App() {
  const [userName, setUserName] = useState<string | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fomrData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {}
  );
  const [selectedColor, setSelectedColor] = useState<Color[]>(color);
  const [show, setShow] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);

  const handleClick = (data: string) => {
    alert(data);
  };

  const handleIncrement = () => {
    setNumber((prev) => prev + 1);
  };

  const handleDecrerment = () => {
    setNumber((prev) => prev - 1);
  };

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: Partial<FormData> = {};
    if (!fomrData.name.trim()) {
      errors.name = "Ім’я є обов’язковим";
    }
    if (!fomrData.email.trim()) {
      errors.email = "Email є обов’язковим";
    }
    if (!fomrData.phone.trim()) {
      errors.phone = "Телефон є обов’язковим";
    }
    if (!fomrData.message.trim()) {
      errors.message = "Повідомлення є обов’язковим";
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log(fomrData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      console.log("Форма успішно відправлена!");
    } else {
      console.log("Помилка валідації форми:", errors);
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const AppRouters = {
    HOME: "/",
    AUTHORS: "/authors",
    USERS: "/users",
    USERSID: "/users/:id",
    NOT_FOUND: "*",
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/authors"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Authors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Books
            </NavLink>
          </li>
        </ul>
      </nav>
      <PageTitleUpdate userName={userName} />
      <Suspense fallback={<h2>...Загружаємо</h2>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path={AppRouters.AUTHORS} element={<Authors />} />
          <Route path={AppRouters.USERS} element={<Books />} />
          <Route
            path={AppRouters.USERSID}
            element={<User setUserName={setUserName} />}
          />
          <Route path={AppRouters.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Tabs tabs={tabData} />
      <button onClick={handleShowModal}>Відкрити модалку</button>
      {showModal && (
        <Modal onClose={handleShowModal}>
          <h2>Модальне вікно</h2>
          <p>Це приклад модального вікна</p>
          <button onClick={handleShowModal}>Закрити модалку</button>
        </Modal>
      )}
      <h1>Дані з бекенду</h1>
      <MainLayout>
        <Users />
        <Button label="Натисни на мене" onClick={handleClick} />
        <button onClick={handleIncrement}>+</button>
        <p>{number}</p>
        <button onClick={handleDecrerment} disabled={number === 1}>
          -
        </button>
      </MainLayout>
      <div>
        <button onClick={handleShow}>{show ? "Сховати" : "Показати"}</button>

        {show && <p>Випадающе меню</p>}
      </div>
      <ul>
        {selectedColor.map((item, index) => (
          <li key={index}>
            <span>{item.label}</span>
            <button
              onClick={() =>
                setSelectedColor((prev) => prev.filter((_, i) => i !== index))
              }
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            value={fomrData.name}
            onChange={handleChange}
          />
          {validationErrors.name && (
            <span className="error">{validationErrors.name}</span>
          )}
        </label>
        <label>
          <input
            type="email"
            name="email"
            value={fomrData.email}
            onChange={handleChange}
          />
          {validationErrors.email && (
            <span className="error">{validationErrors.email}</span>
          )}
        </label>
        <label>
          <input
            type="tel"
            name="phone"
            value={fomrData.phone}
            onChange={handleChange}
          />
          {validationErrors.phone && (
            <span className="error">{validationErrors.phone}</span>
          )}
        </label>
        <label>
          <textarea
            name="message"
            rows={6}
            value={fomrData.message}
            onChange={handleChange}
          ></textarea>
          {validationErrors.message && (
            <span className="error">{validationErrors.message}</span>
          )}
        </label>
        <button type="submit">Відправити</button>
      </form>
    </>
  );
}

export default App;
