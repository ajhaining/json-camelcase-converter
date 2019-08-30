import React, { useState } from 'react';
import './App.css';
import camelcaseKeys from "camelcase-keys"
import beautifyJson from "json-beautify"

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/tomorrow';

function App() {
  const [blob, setBlob] = useState("")
  const [error, setError] = useState()

  var camelified = ""

  if (!error && blob) {
    try {
      const json = JSON.parse(blob);
      camelified = beautifyJson(camelcaseKeys(json, {deep: true}), null, 2, 80)
    } catch(e) {
      setError("JSON is not parseable, check it is valid.")
    }
  }

  const onChange = (value) => {
    setBlob(value)
    setError()
  }


  return (
    <div className="row">
      <AceEditor
        style={{ flex: 1, height: "100vh" }}
        placeholder="Put your JSON 'ere"
        mode="json"
        theme="tomorrow"
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        onChange={value => onChange(value)}
        value={blob}
        name="UNIQUE_ID_OF_DIV"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
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
