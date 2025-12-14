import axios from "axios";
import { useEffect, useState } from "react";

export default function SweetList() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sweets", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setSweets(res.data));
  }, []);

  return (
    <ul>
      {sweets.map((s: any) => (
        <li key={s._id}>{s.name} ({s.quantity})</li>
      ))}
    </ul>
  );
}
