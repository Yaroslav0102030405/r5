import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import Users from "./services/users/Users";

function App() {
  return (
    <>
      <h1>Дані з бекенду</h1>
      <MainLayout>
        <Users />
      </MainLayout>
    </>
  );
}

export default App;
