import axios from "axios";
import { useState } from "react";

export default function AddSweet() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0
  });

  const submit = async () => {
    await axios.post(
      "http://localhost:5000/api/sweets",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    alert("Sweet added");
  };

  return (
    <div>
      <h3>Add Sweet</h3>
      <input placeholder="Name" onChange={(e: { target: { value: any; }; }) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input type="number" placeholder="Price" onChange={e => setForm({ ...form, price: +e.target.value })} />
      <input type="number" placeholder="Quantity" onChange={e => setForm({ ...form, quantity: +e.target.value })} />
      <button onClick={submit}>Add</button>
    </div>
  );
}
