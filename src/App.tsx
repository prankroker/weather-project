import { useState } from "react";
import { apiKey } from "./apiKey";

function App() {
  const url = "https://api.tomorrow.io/v4/weather/realtime?location=";
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({
    humidity: 0,
    temperature: 0,
    visibility: 0,
    windSpeed: 0,
  });

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  async function handleClick() {
    try {
      const response = await fetch(url + input + apiKey);
      if (response.ok) {
        const out = await response.json();
        setOutput({
          humidity: out.data.values.humidity,
          temperature: out.data.values.temperature,
          visibility: out.data.values.visibility,
          windSpeed: out.data.values.windSpeed,
        });
      }
    } catch (error) {
      alert("Incorrect input or date don't exist");
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="font-bold text-2xl">Enter City:</h1>
      <div className="flex p-6 border border-black rounded">
        <input
          id="input"
          value={input}
          onChange={handleInput}
          type="text"
          className="border border-black rounded"
        ></input>
        <button className="border border-black rounded" onClick={handleClick}>
          Fetch
        </button>
      </div>
      <div className="border border-black rounded">
        Temperature: {output.temperature}, Humidity: {output.humidity},
        Visibility: {output.visibility}, WindSpeed: {output.windSpeed}
      </div>
    </>
  );
}

export default App;
