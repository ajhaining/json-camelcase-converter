import React, { useState } from 'react';
import './App.css';
import camelcaseKeys from "camelcase-keys"
import beautifyJson from "json-beautify"

function App() {
  const [blob, setBlob] = useState("")
  const [error, setError] = useState()

  var camelified = ""

  if (!error && blob) {
    try {
      const json = JSON.parse(blob);
      camelified = beautifyJson(camelcaseKeys(json), null, 2, 80)
    } catch(e) {
      setError("JSON is not parseable, check it is valid.")
    }
  }

  const handleChange = (value) => {
    setBlob(value)
    setError()
  }


  return (
    <div className="row">
      <textarea
        className="column"
        onChange={e => handleChange(e.target.value)}
        placeholder="Insert JSON here."
      />
      <div className="column grey">
        {error ?
          <div className="error">{error}</div> :
          <pre>
            {blob.length > 0 ? camelified : ""}
          </pre>
        }
      </div>
    </div>
  );
}

export default App;
