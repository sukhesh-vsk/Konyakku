import { useEffect, useState } from "react";
import LanguageSelector from "./assets/LanguageSelector";

import "./App.css";
import { styles } from "./assets/style";
import replace from "./assets/exchange.png";

function App() {
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
    .then(data => {
      setOutput(data.translated_text);
      setPronunciation(data.spell);
    })
    .then(setLoading(false))
  }

  return (
    <div style={styles.container} id="cont">
      <div style={{display: "flex", gap: "10px"}}>
        <LanguageSelector
              txt="From"
              lang={from}
              onChange={(e) => setFrom(e)}
          />
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
        <LanguageSelector 
              txt="To"
              lang={to}
              onChange={(e) => setTo(e)}
          />
      </div>

      {/* For Getting text input */}
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
          style={styles.inputFld}
          placeholder="Type here..."
        ></textarea>
      </div>

      {/* For Displaying Output */}
      <div style={styles.outputFld}>
        <h3 style={{margin: "0 0"}}>{(isLoading) ? "Loading...." : output}</h3>
        <h4 style={{color: "rgb(0 0 0 / 67%)", marginTop: "5px"}}>{(isLoading) ? "" : pronunciation}</h4>
      </div>

      {/* Translate Button */}
      <div>
        <button
          onClick={(e) => translate()}
          style={styles.translateBtn}
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
