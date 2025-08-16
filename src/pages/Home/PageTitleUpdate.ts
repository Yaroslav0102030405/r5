import { useLocation, matchPath } from "react-router-dom";
import { useEffect } from "react";
import type { FC } from "react";

interface PageTitleUpdateProps {
  userName?: string;
}

// Визначаємо тип для об'єкта маршруту
interface RouteConfig {
  path: string;
  title: string;
}

const PageTitleUpdate: FC<PageTitleUpdateProps> = ({ userName }) => {
  const location = useLocation();

  useEffect(() => {
    const routes: RouteConfig[] = [
      { path: "/", title: "Головна" },
      { path: "/authors", title: "Актори" },
      { path: "/users", title: "Книги" },
      { path: "/users/:id", title: "Один юзер" },
    ];

    let newTitle = "Мій веб-додаток";

    for (const route of routes) {
      const match = matchPath(
        { path: route.path, end: true },
        location.pathname
      );

      if (match) {
        // Якщо це маршрут користувача і ми отримали userName
        if (route.path === "/users/:id" && userName) {
          newTitle = userName;
        } else {
          newTitle = route.title;
        }
        break;
      }
    }

    document.title = newTitle;
  }, [location, userName]); // Додаємо userName в масив залежностей useEffect

  return null;
};

export default PageTitleUpdate;
