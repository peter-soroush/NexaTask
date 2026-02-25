import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { useState } from "react";
import RadioButton from "../elements/RadioButton";
import { FiSettings } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToDoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const addHandler = async () => {
    const res = await fetch("/api/auth/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });
    const data = await res.json();
    console.log(data.status);
    if (data.status === "success") {
      setTitle("");
      setDescription("");
      setStatus("todo");
      toast.success("Todo added successfully!");
    }

    console.log(data);
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Buy Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="todo"
          title="Todo"
        >
          <BsAlignStart />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="inProgress"
          title="In Progress"
        >
          <FiSettings />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="review"
          title="Review"
        >
          <AiOutlineSearch />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="done"
          title="Done"
        >
          <MdDoneAll />
        </RadioButton>
        <div className="add-form__input--third">
          <label htmlFor="description">
            <TbFileDescription />
            Description
          </label>
          <textarea
            maxLength="200"
            rows="4"
            cols="50"
            id="description"
            name="description"
            placeholder="e.g. Buy milk, eggs, and bread"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <button className="add-form__input--button" onClick={addHandler}>
          Add Todo
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddToDoPage;
