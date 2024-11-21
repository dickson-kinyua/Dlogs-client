import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const Register = () => {
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      fullNames,
      email,
      password,
      confirm,
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorMssg = await response.json();
        console.log(errorMssg);
        setError(errorMssg.error);
        return;
      }

      const json = await response.json();
      console.log(json);
      setRedirect(true)
    } catch (error) {
      console.error(error);
    }
  };


  if (redirect) {
    return (
      <Navigate to={"/login"} />
    )
  }


  return (
    <div className="mt-12">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-1/2 ">
        {/* <h2 className="text-center">Create a new account</h2> */}
        <label>Fullnames :</label>
        <input
          className="bg-gray-200 p-4"
          type="text"
          value={fullNames}
          onChange={(e) => setFullNames(e.target.value)}
        />
        <label>Email address :</label>
        <input
          className="bg-gray-200 p-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password :</label>
        <input
          className="bg-gray-200 p-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password :</label>
        <input
          className="bg-gray-200 p-4"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && <div className="text-red-700">{error}</div>}
        <button type="submit" className="bg-orange-500 p-3">
          Create
        </button>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};
