import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/userContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://portfolio-project-df6w.onrender.com/ login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorMssg = await response.json();
        console.log(errorMssg);
        setError(errorMssg.error);
        return;
      }

      const data = await response.json();
      setRedirect(true);
      setLoggedUser(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-20">
      <form onSubmit={loginHandler} className="flex flex-col gap-4 w-1/2">
        {/* <h3>Login</h3> */}
        <label htmlFor="email">Email address :</label>
        <input
          id="email"
          className="bg-gray-200 p-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="bg-gray-200 p-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-700">{error}</div>}
        <button type="submit" className="bg-orange-500 p-3">
          Login
        </button>
        <p>
          New to Dblogs? <Link to={"/register"}>Create a new account</Link>
        </p>
      </form>
    </div>
  );
};
