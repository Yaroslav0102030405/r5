import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
const User = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <div>... Завантаження</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  if (!user) {
    return <div>Користувача не знайдено.</div>;
  }
  return (
    <>
      <Link to="/users">Назад</Link>
      <h1>Сторінка користувача {id}</h1>
      <div>
        <h3>Ім'я: {user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Вебсайт: {user.website}</p>
        <p>
          Адреса: {user.address.street}, {user.address.city}
        </p>
      </div>
    </>
  );
};

export default User;
