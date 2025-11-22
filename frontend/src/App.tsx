import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { logIn } from "./redux/userSlice";
import { logOut } from "./redux/userSlice";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

import "./App.css";

//console.log(Cookies.get("email")!==undefined);

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["email"]);

  const schema = z.object({
      email: z.string().email(),
  }); 

  const handleSetCookie = (email) => {
    setCookie("email", email, {
      path: "/",
      maxAge: 600, // 600 seconds
    });
  }; 
  
  const [logInErrorMsg, setLogInErrorMsg] = React.useState("");
  
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userStatus.isLoggedIn);
  
  const userLogIn = (e) => {
  e.preventDefault();

  try {
    const res = schema.parse({
      email: e.target.email.value,
    });

    // check credentials
    if (
      e.target.email.value === "vas.jonas@gmail.com" &&
      e.target.password.value === "test"
    ) {
      dispatch(logIn());
      handleSetCookie(e.target.email.value);
      setLogInErrorMsg("");
      console.log("logged in");
    } else {
      throw new Error("Wrong user name or password");
    }
  } catch (err) {
    setLogInErrorMsg("Blogi prisijungimo duomenys");
  }
};
  
  
  const userReLog = () =>{
      if(Cookies.get("email")!== undefined)
          dispatch(logIn());
  }
  
  const userLogOut = () => {
      dispatch(logOut());
      console.log("logged out");
  }
  
  React.useEffect(() => userReLog(), [])
  
  const divAttributes = isLoggedIn ? "md:w-1/1":"md:w-4/5";
  return (
    <div className="flex flex-col md:flex-row min-h-screen" >
      {!isLoggedIn ? (
        <div className="pl-1 space-y-3 w-full md:w-1/5 p-8">
          <form onSubmit={userLogIn} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
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

      {/*      <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
            </div>   */}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg 
              font-semibold hover:bg-green-700 transition duration-200"
            >
              Log in
            </button>
            <div>
               {/* {`${divAttributes} bg-white text-black flex flex-col items-start justify-start`}*/}
                <p id="login_form_error_msg">{`${logInErrorMsg}`}</p>
            </div>
          </form>
        </div>
      ) : (
        <div className="pl-1 space-y-3 w-full md:w-0 p-8"></div>
        
      )}
   
      {isLoggedIn && (
  <p onClick={userLogOut}>
    Atsijungti
  </p>
)}

     
      <div className={`${divAttributes} bg-white text-black flex flex-col items-start justify-start`}>
        <table class='border-1'>
          <thead class="border-1">
            <tr>
              <th scope="col" class="border-1">Režisierius</th>
              <th scope="col" class="border-1">Pavadinimas orginalo kalba</th>
              <th scope="col" class="border-1">Pavadinimas lietuvių kalba</th>
              <th scope="col" class="border-1">Žandras</th>
              <th scope="col" class="border-1">Aktoriai</th>
              <th scope="col" class="border-1">Apie</th>
              <th scope="col" class="border-1">Metai</th>
            </tr>
          </thead>
          <tbody class='border-1'>
            <tr class='border-1'>
              <td scope="col" class="border-1">Vardenis Pavardenis</td>
              <td scope="col" class="border-1">Name</td>
              <td scope="col" class="border-1">Pavadinimas</td>
              <td scope="col" class="border-1">Komedija</td>
              <td scope="col" class="border-1">Aktorius 1, Aktorius 2</td>
              <td scope="col" class="border-1">--- --- --- --- --- --- --- --- --- --- </td>
              <td scope="col" class="border-1">2020</td>
            </tr>
            <tr class='border-1'>
              <td scope="col" class="border-1">Vardenė Pavardenė</td>
              <td scope="col" class="border-1">Name</td>
              <td scope="col" class="border-1">Pavadinimas 2</td>
              <td scope="col" class="border-1">Drama</td>
              <td scope="col" class="border-1">Aktorius 1, Aktorius 3, Aktorius 2</td>
              <td scope="col" class="border-1">+++ +++ +++ +++ +++ +++ +++ </td>
              <td scope="col" class="border-1">2014</td>
            </tr>
            <tr class='border-1'>
              <td scope="col" class="border-1">Vardenis Pavardenis</td>
              <td scope="col" class="border-1">Name 2</td>
              <td scope="col" class="border-1">Pavadinimas 2</td>
              <td scope="col" class="border-1">Komedija</td>
              <td scope="col" class="border-1">Aktorius 1, Aktorius 2</td>
              <td scope="col" class="border-1">*** *** *** *** *** *** *** *** </td>
              <td scope="col" class="border-1">2022</td>
            </tr>
            <tr class='border-1'>
              <td scope="col" class="border-1">Vardenis Pavardenis</td>
              <td scope="col" class="border-1">Name 3</td>
              <td scope="col" class="border-1">Pavadinimas 3</td>
              <td scope="col" class="border-1">Trileris</td>
              <td scope="col" class="border-1">Aktorius 1, Aktorius 2, Aktorius 5</td>
              <td scope="col" class="border-1">/// /// /// /// /// /// /// /// /// /// </td>
              <td scope="col" class="border-1">1990</td>
            </tr>
            <tr class='border-1'>
              <td scope="col" class="border-1">Vardenis Pavardenis</td>
              <td scope="col" class="border-1">Name 4</td>
              <td scope="col" class="border-1">Pavadinimas 4</td>
              <td scope="col" class="border-1">Trileris</td>
              <td scope="col" class="border-1">Aktorius 1, Aktorius 2, Aktorius 5</td>
              <td scope="col" class="border-1">### ### ### ### ### ### ### ### ### ### </td>
              <td scope="col" class="border-1">1990</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

