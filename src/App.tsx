import "./App.css";
import Button from "./components/Button/Button";
import MainLayout from "./components/layout/MainLayout";
import Users from "./services/users/Users";

function App() {
  const handleClick = (data: string) => {
    alert(data);
  };
  return (
    <>
      <h1>Дані з бекенду</h1>
      <MainLayout>
        <Users />
        <Button label="Натисни на мене" onClick={handleClick} />
      </MainLayout>
    </>
  );
}

export default App;
