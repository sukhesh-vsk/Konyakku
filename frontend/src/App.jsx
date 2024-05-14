import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import replace from "./assets/exchange.png";


function App() {
  const [options, setOption] = useState(['en','ma', 'ta', 'ja', 'fr', 'hi', 'ru', 'ml']);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("ta");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Your translation will appear here...");
  const [pronunciation, setPronunciation] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setOutput("Loading...");
    }
  }, [isLoading]);

  const replaceLang = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  const translate = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'text': input,
        'source_lang': from,
        'target_lang': to
      })
    })
    .then(response => response.json())
    .then(setLoading(false))
    .then(data => {
      setOutput(data.translated_text);
      setPronunciation(data.spell);
    })
  
  }

  return (
    <div
      style={{
        padding: "0",
        border: "solid 15px black",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{display: "flex", gap: "10px"}}>
        <div>
          From ({from}) : &nbsp;
          <select
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 2px 2px 0 grey",
              borderRadius: "5px 5px 5px 5px",
              padding: "10px",
              cursor: "pointer",
              borderColor: "grey",
            }}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {options.map((opt, index) => (
              <option
                style={{ backgroundColor: "transparent", textAlign: "left", color: "black", fontSize: "15px"}}
                key={index}
                value={opt}
              >
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div style={{padding: "0", margin: "auto 0"}}>
          <img 
            src={replace} 
            alt="replace icon" 
            style={{
              width: "25px",
              cursor: "pointer",
            }}
            onClick={() => replaceLang()}
            />
        </div>
        <div>
          &nbsp;To ({to}) : &nbsp;
          <select
            style={{
              cursor: "pointer",
              backgroundColor: "#fff",
              boxShadow: "0 2px 2px 0 grey",
              borderRadius: "5px 5px 5px 5px",
              padding: "10px",
            }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* For Getting text input */}
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
          style={{
            backgroundColor: "#000f",
            color: "#fff",
            borderRadius: "5px 5px 5px 5px",
            padding: "15px 15px 15px 15px",
            fontSize: "18px",
          }}
          placeholder="Type here..."
        ></textarea>
      </div>
      {/* For Displaying Output */}
      <div style={{
                    height: "200px", 
                    width: "580px", 
                    backgroundColor: "#bdc1c6",
                    color: "000",
                    fontSize: "18px",
                    fontWeight: "bold",
                    letterSpacing: "1.5px",
                    borderRadius: "5px 5px 5px 5px",
                    padding: "15px 15px 15px 15px",
                    textAlign: "left",
        }}>
        <h3 style={{margin: "0 0"}}>{(isLoading) ? "Loading...." : output}</h3>
        <h4 style={{color: "rgb(0 0 0 / 67%)", marginTop: "5px"}}>{(isLoading) ? "" : pronunciation}</h4>
      </div>

      {/* Translate Button */}
      <div>
        <button
          onClick={(e) => translate()}
          style={{
            backgroundColor: "blue",
            padding: "15px 15px",
            borderRadius: "5px 5px 5px 5px",
            textAlign: "center",
            color: "#fff",
            fontSize: "18px",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
