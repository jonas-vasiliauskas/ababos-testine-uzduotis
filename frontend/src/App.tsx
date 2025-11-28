import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { logIn, logOut } from "./redux/userSlice";
import { useCookies } from "react-cookie";
import { movieArray } from "./data/movieArray";
import Cookies from "js-cookie";

import "./App.css";

export default function App() {
  const [cookies, setCookie] = useCookies(["email"]);

  const schema = z.object({
    email: z.string().email(),
  });

  const handleSetCookie = (email: string) => {
    setCookie("email", email, {
      path: "/",
      maxAge: 600,
    });
  };

  const [logInErrorMsg, setLogInErrorMsg] = React.useState("");

  // Movies state
  const [movies, setMovies] = React.useState(movieArray);

  // Store sorting direction per column
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // NEW: inline error when sorting while logged out
  const [sortError, setSortError] = React.useState("");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.userStatus.isLoggedIn);

  const userLogIn = (e: any) => {
    e.preventDefault();

    try {
      schema.parse({
        email: e.target.email.value,
      });

      if (
        e.target.email.value === "test@gmail.com" &&
        e.target.password.value === "test"
      ) {
        dispatch(logIn());
        handleSetCookie(e.target.email.value);
        setLogInErrorMsg("");
        setSortError(""); // clear sorting error after login
      } else {
        throw new Error("Wrong login");
      }
    } catch (err) {
      setLogInErrorMsg("Blogi prisijungimo duomenys");
    }
  };

  const userReLog = () => {
    if (Cookies.get("email") !== undefined) dispatch(logIn());
  };

  const userLogOut = () => {
    dispatch(logOut());
  };

  const sortBy = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    // If not logged in → show UI warning instead of alert()
    if (!isLoggedIn) {
      setSortError("Reikia prisijungti");
      return;
    }

    // Clear previous error
    setSortError("");

    const sorted = [...movies].sort((a: any, b: any) => {
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    setMovies(sorted);
    setSortConfig({ key, direction });
  };

  React.useEffect(() => userReLog(), []);

  const divAttributes = isLoggedIn ? "md:w-1/1" : "md:w-4/5";

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {!isLoggedIn ? (
        <div className="pl-1 space-y-3 w-full md:w-1/5 p-8">
          <form onSubmit={userLogIn} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                El. paštas
              </label>
              <input
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Slaptažodis
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg 
              font-semibold hover:bg-green-700 transition duration-200"
            >
              Prisijungti
            </button>

            <p id="login_form_error_msg">{logInErrorMsg}</p>
          </form>
        </div>
      ) : (
        <div className="pl-1 space-y-3 w-full md:w-0 p-8"></div>
      )}

      {isLoggedIn && (
        <p onClick={userLogOut} className="cursor-pointer text-blue-600 underline pl-4">
          Atsijungti
        </p>
      )}

      <div className={`${divAttributes} bg-white text-black items-start`}>
        <p className="flex justify-center mb-3">
            Mėgstamiausių filmų sąrašas
        </p>

        {/* Sorting error message */}
        {sortError && (
          <p className="text-red-600 text-center mb-2">{sortError}</p>
        )}

        <table className="border-1">
          <thead className="border-1">
            <tr>
              <th className="border-1 cursor-pointer" onClick={() => sortBy("directorName")}>
                Režisierius
              </th>
              <th className="border-1 cursor-pointer" onClick={() => sortBy("originalName")}>
                Pavadinimas originalo kalba
              </th>
              <th className="border-1 cursor-pointer" onClick={() => sortBy("movieNameInLithuanian")}>
                Pavadinimas lietuvių kalba
              </th>
              <th className="border-1 cursor-pointer" onClick={() => sortBy("gendre")}>
                Žanras
              </th>
              <th className="border-1">Aktoriai</th>
              <th className="border-1 cursor-pointer" onClick={() => sortBy("description")}>
                Aprašymas
              </th>
              <th className="border-1 cursor-pointer" onClick={() => sortBy("year")}>
                Metai
              </th>
            </tr>
          </thead>

          <tbody className="border-1">
            {movies.map((movie, i) => (
              <tr key={i}>
                <td className="border-1">{movie.directorName}</td>
                <td className="border-1">{movie.originalName}</td>
                <td className="border-1">{movie.movieNameInLithuanian}</td>
                <td className="border-1">{movie.gendre}</td>
                <td className="border-1">{movie.cast.join(", ")}</td>
                <td className="border-1">{movie.description}</td>
                <td className="border-1">{movie.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

