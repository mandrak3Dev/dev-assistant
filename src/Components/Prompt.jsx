import React, { useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const Prompt = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    console.log("Works!")
    console.log(messages);
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, user: "user" }]);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          prompt: input,
          max_tokens: 150,
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            Authorization: "Bearer token",
          },
        }
      );

      setMessages([
        ...messages,
        { text: response.data.choices[0].text, user: "ai" },
      ]);
    } catch (error) {
      console.error("Error al comunicarse con la API de ChatGPT", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="input-group input-group-lg mb-5">
            <input
              type="text"
              className="form-control"
              placeholder="What do you need?"
              aria-label="What do you need?"
              aria-describedby="send-prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="send-prompt"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
