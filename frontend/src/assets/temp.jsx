import { useEffect, useState } from "react";
import "./App.css";
import { useSpeechSynthesis } from "react-speech-kit";
const axios = require("axios").default;
function App() {
  // Option are the language fetched from api
  const [options, setOption] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        header: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setOption(res.data);
      });
  }, []);
  const translate = () => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        setOutput(res.data.translatedText);
      });
  };

  return (
    <div
      style={{
        padding: "0",
        border: "solid 15px black",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
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
          onChange={(e) => setFrom(e.target.value)}
        >
          {options.map((opt) => (
            <option
              style={{ backgroundColor: "transparent", textAlign: "left" }}
              key={opt.code}
              value={opt.code}
            >
              {opt.name}
            </option>
          ))}
        </select>
        &nbsp;To ({to}) : &nbsp;
        <select
          style={{
            cursor: "pointer",
            backgroundColor: "#fff",
            boxShadow: "0 2px 2px 0 grey",
            borderRadius: "5px 5px 5px 5px",
            padding: "10px",
          }}
          onChange={(e) => setTo(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
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
        <div>
          <button
            onClick={() => speak({ text: input })}
            style={{
              backgroundColor: "transparent",
              padding: "5px 5px",
              borderRadius: "5px 5px 5px 5px",
              textAlign: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            Speak&nbsp;{" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg"
              style={{
                width: "15px",
                height: "15px",
                textAlign: "center",
                justifyContent: "center",
                marginTop: "2px",
                marginLeft: "5px",
              }}
              alt="speak"
            />
          </button>
        </div>
      </div>
      {/* For Displaying Output */}
      <div>
        <textarea
          cols="50"
          rows="8"
          value={output}
          style={{
            backgroundColor: "#bdc1c6",
            color: "#fff",
            fontSize: "18px",
            borderRadius: "5px 5px 5px 5px",
            padding: "15px 15px 15px 15px",
          }}
        ></textarea>
      </div>
      <div>
        <button
          style={{
            backgroundColor: "transparent",
            padding: "5px 5px",
            borderRadius: "5px 5px 5px 5px",
            textAlign: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => speak({ text: output })}
        >
          Speak&nbsp;
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg"
            style={{
              width: "15px",
              height: "15px",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "2px",
              marginLeft: "5px",
            }}
            alt="speak"
          />
        </button>
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
