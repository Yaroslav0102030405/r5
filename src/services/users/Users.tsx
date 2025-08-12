import { useState, useEffect } from "react";
import imagesNext from "../../assets/images/next.jpg"; // Assuming you have an image at this path

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

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data: User[] = await response.json();
        setUsers(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Завантаження даних...</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  return (
    <>
      <ul>
        {users.map(
          ({ id, name, username, email, address, phone, website, company }) => (
            <li key={id}>
              <img width={360} src={imagesNext} alt={name} />
              <h2>{name}</h2>
              <p>Username: {username}</p>
              <p>Email: {email}</p>
              <p>
                Address: {address.street}, {address.suite}, {address.city}
              </p>
              <p>
                Geo Location: Lat: {address.geo.lat}, Lng: {address.geo.lng}
              </p>
              <p>Phone: {phone}</p>
              <p>Website: {website}</p>
              <p>Company: {company.name}</p>
              <p>Catch Phrase: {company.catchPhrase}</p>
              <p>BS: {company.bs}</p>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default Users;
