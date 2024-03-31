import { ElementRef, FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { createId as cuid } from "@paralleldrive/cuid2";

function App() {
  const [data, setData] = useState<any[]>([]);

  const formRef = useRef<ElementRef<"form">>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios("http://localhost:3000/chat");
        setData(res.data);
      } catch (e) {
        console.log(e);
        setData([]);
      }
    })();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const id = cuid();
    setData((prev) => [...prev, { id, username, email, phone }]);
    formRef.current?.reset();
    try {
      await axios.post("http://localhost:3000/chat", {
        id,
        username,
        email,
        phone,
      });
      console.log("running??");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id: string) => {
    setData(data.filter((d) => d.id !== id));
    try {
      await axios.post(`http://localhost:3000/chat/delete/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center flex-col">
      <h2 className="font-bold text-xl mb-5">BOOKING APPOINTMENT APP</h2>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="max-w-lg flex flex-col w-full items-center justify-center gap-5"
      >
        <div className="flex w-full outline-none flex-col gap-3 items-start">
          <label htmlFor="username">Username</label>
          <input
            className="p-1 w-full px-3 rounded-md"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="flex w-full flex-col gap-3 items-start">
          <label htmlFor="phone">Phone Number</label>
          <input
            className="p-1 w-full px-3 rounded-md"
            type="number"
            name="phone"
            id="phone"
          />
        </div>
        <div className="flex w-full flex-col gap-3 items-start">
          <label htmlFor="email">Email</label>
          <input
            className="p-1 w-full px-3 rounded-md"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <button type="submit" className="w-full">
          Submit
        </button>
      </form>
      <ul className="flex flex-col items-center mt-20 gap-5">
        {data.map((d, idx) => (
          <li
            key={idx}
            className="flex items-center gap-5 border py-2 px-5 rounded-md"
          >
            <div className="flex items-center justify-center">
              <span>{d.username}</span>
              <span>-</span>
              <span>{d.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleDelete.bind(null, d.id)}>
                <Trash2 className="w-4 h-4" />
              </button>
              <button type="button">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
