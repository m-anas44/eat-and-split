import React, { useState } from "react";
import Section from "./section";
import { GuestTodoContextProvider } from "../context/GuestTodoContext";

const Card = () => {
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [todos, setTodos] = useState([
    {
      id: Date.now(),
      name: "Clark",
      message: "You owe Clark $90",
      openState: false,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Example avatar
    },
    {
      id: Date.now() + 1,
      name: "Bruce",
      message: "You owe Bruce $30",
      openState: false,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg", // Example avatar
    },
    {
      id: Date.now() + 2,
      name: "Peter",
      message: "Peter owes you $60",
      openState: false,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg", // Example avatar
    },
    {
      id: Date.now() + 3,
      name: "Tony",
      message: "Tony owes you $70",
      openState: false,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg", // Example avatar
    },
  ]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Function to generate a random avatar URL
  const getRandomAvatar = () => {
    const id = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/men/${id}.jpg`; // Random avatar URL
  };

  const addGuest = () => {
    if (!name.trim()) {
      return; // If the name is empty or only contains whitespace, don't add the guest
    }

    setTodos((prevTodos) => [
      {
        id: Date.now(),
        name,
        message: `You and ${name} are even`,
        openState: false,
        avatar: avatar || getRandomAvatar(), // Use uploaded avatar or random avatar
      },
      ...prevTodos,
    ]);
    setOpenForm(!openForm);
    setName(""); // Clear the name input after adding a guest
    setAvatar(""); // Clear the avatar input after adding a guest
  };

  const deleteGuest = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setSelectedTodo(null)
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Set the avatar as the file's base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const openSectionFunction = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, openState: !todo.openState }
        : { ...todo, openState: false }
    );

    setTodos(updatedTodos);

    if (selectedTodo?.id === id) {
      setSelectedTodo(null);
    } else {
      setSelectedTodo(
        updatedTodos.find((todo) => todo.id === id && todo.openState)
      );
    }
  };

  const updateSplitBillMessage = (id, message) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, message, openState: false } : todo
      )
    );
    setSelectedTodo(null);
  };

  return (
    <GuestTodoContextProvider
      value={{ todos, addGuest, updateSplitBillMessage, deleteGuest }}
    >
      <div className="flex max-w-md md:max-w-4xl flex-wrap flex-col md:flex-row mx-auto md:mt-24">
        <div className="flex-1 p-4 py-10">
          {todos.map((item) => {
            return (
              <div key={item.id}>
                <div className="flex items-center gap-x-1.5 hover:bg-orange-100 rounded transition duration-500 max-w-xs mx-auto p-3">
                  <img
                    src={item.avatar}
                    alt="Profile"
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold">{item.name}</span>
                    <p className="text-xs">{item.message}</p>
                  </div>
                  <button
                    onClick={() => deleteGuest(item.id)}
                    className="ml-auto p-1 rounded text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                      fill="maroon"
                    >
                      <path d="M29,7.5c0-1.93-1.57-3.5-3.5-3.5H17V3c0-0.553-0.447-1-1-1s-1,0.447-1,1v1H6.5C4.57,4,3,5.571,3,7.5c0,0.553,0.447,1,1,1	s1-0.447,1-1C5,6.673,5.673,6,6.5,6h19C26.327,6,27,6.673,27,7.5S26.327,9,25.5,9c-0.09,0-0.171,0.029-0.254,0.051	c-0.064-0.017-0.122-0.046-0.19-0.049c-0.02-0.001-0.037,0.008-0.056,0.008L25,9H10.989l0.873,16.412	c0.044,0.828-0.591,1.534-1.418,1.578c-0.014,0-0.027,0.001-0.041,0.001c-0.033-0.002-0.065-0.006-0.097-0.009	c-0.078-0.003-0.15-0.025-0.225-0.041C9.41,26.766,8.9,26.179,8.859,25.455L7.998,9.945c-0.03-0.551-0.487-0.973-1.054-0.942	c-0.551,0.03-0.974,0.502-0.942,1.054l0.861,15.511C6.971,27.493,8.565,29,10.493,29h11.014c1.928,0,3.522-1.508,3.63-3.434	l0.811-14.612C27.665,10.732,29,9.277,29,7.5z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => openSectionFunction(item.id)}
                    className="py-1 px-2 bg-orange-300 font-bold rounded"
                  >
                    <p className={`${item.openState ? "hidden" : "block"}`}>
                      Select
                    </p>
                    <p className={`${item.openState ? "block" : "hidden"}`}>
                      Close
                    </p>
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mx-auto max-w-xs mt-5">
            <div
              className={`bg-orange-100 p-2 rounded ${
                openForm ? "block" : "hidden"
              }`}
            >
              <div>
                <h2 className="font-semibold">Friend Name</h2>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="p-2 rounded focus:outline-none border border-orange-200 w-full"
                />
              </div>
              <div className="w-full mt-4">
                <label
                  htmlFor="file-upload"
                  className="block text-md font-medium text-black mb-1"
                >
                  Upload Avatar
                </label>
                <div className="relative border bg-white border-orange-200 rounded-md shadow-sm hover:border-orange-400 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full cursor-pointer p-2 text-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={addGuest}
                  className="px-14 py-1 bg-orange-300 font-semibold rounded"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={() => {
                  setOpenForm(!openForm);
                }}
                className="px-3 py-1 bg-orange-300 rounded font-semibold"
              >
                <p className={`${openForm ? "hidden" : "block"}`}>Add Friend</p>
                <p className={`${openForm ? "block" : "hidden"}`}>Close</p>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {selectedTodo && (
            <div className="p-10 bg-orange-100 rounded">
              <Section todo={selectedTodo} />
            </div>
          )}
        </div>
      </div>
    </GuestTodoContextProvider>
  );
};

export default Card;
