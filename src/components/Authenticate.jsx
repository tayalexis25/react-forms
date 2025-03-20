import { useState } from "react";
export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  console.log("Token: ", token);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("Authenticate Result: ", result);
      setData(result.data);
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage === "jwt malformed" ? (
        <p style={{ color: "red" }}>there was an error, please try again</p>
      ) : (
        <p style={{ color: "green" }}>{successMessage}</p>
      )}
      {data && <p>Welcome {data.username}</p>}

      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}