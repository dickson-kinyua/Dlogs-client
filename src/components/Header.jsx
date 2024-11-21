import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'


export const Header = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  const menus = [
    {
      title: "Sign up",
      route: "/register",
      requiresLogin: false
    },
    {
      title: "Sign in",
      route: "/login",
      requiresLogin: false

    },
    {
      title: "Create new blog",
      route: "/newPost",
      requiresLogin: true

    }
  ]
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/profile",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          return;
        }

        const data = await response.json();
        if (JSON.stringify(loggedUser) !== JSON.stringify(data)) {
          setLoggedUser(data);
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [loggedUser]);

  const logoutFn = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }

      const message = await response.json();
      setLoggedUser(null);
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row justify-between fixed top-0 left-0 right-0 px-10 bg-slate-50">
      <div>
        <Link to={"/"}>Dblogs</Link>
      </div>
      <FontAwesomeIcon icon={faBars} className="md:hidden" onClick={toggleVisibility} />

      <div className="hidden md:block">



        <div className="flex flex-row gap-5">

          {
            menus.filter(m => m.requiresLogin === !!loggedUser?.email).map(menu => (

              <>

                <Link to={menu.route}>{menu.title}</Link>


              </>

            ))
          }
          {
            loggedUser?.email && (<a onClick={logoutFn}>Logout</a>)
          }



          {/* <p>
              Welcome {loggedUser?.email.split("@").map((name) => name)[0]},
            </p> */}
        </div>

      </div>
      <div className={isVisible ? "block" : "hidden"}>
        {!loggedUser?.email && (
          <>
            <Link to={"/login"}>Sign in</Link>
            <Link to={"/register"}>Sign up</Link>
          </>
        )}

        {loggedUser?.email && (
          <div className="flex flex-row gap-5">
            <Link to={"/newPost"}>Create new blog</Link>
            <a onClick={logoutFn}>Logout</a>
            <p>
              Welcome {loggedUser?.email.split("@").map((name) => name)[0]},
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
