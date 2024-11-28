"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [response, setResponse] = useState("Hi there! How can I assist you today?");
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/chatbot", {
        question: value
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      setResponse(response.data.message); // Assuming the response has a 'message' property
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Ensure the initial state is consistent
    setResponse("Hi there! How can I assist you today?");
  }, []);

  return (
    <div className="m-3">
      <div className="">
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Enter your question..."
          value={value}
          onChange={onChange} />
      </div>
      <div>
        <button className="mt-2 p-2 rounded-md bg-teal-600 text-white" onClick={handleSubmit}>Get Answer</button>
      </div>
      <div className="my-3 p-3 bg-cyan-700 text-white rounded-md">
        {response}
      </div>
    </div>
  );
}