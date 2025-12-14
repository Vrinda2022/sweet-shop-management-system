import axios from "axios";

export default function Register() {
  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      username: "admin",
      password: "admin",
      role: "ADMIN"
    });
  };
  return <button onClick={register}>Register</button>;
}
