import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [charactersAllowed, setCharactersAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = "";

    let charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbersAllowed) charSet += "0123456789";
    if (charactersAllowed) charSet += "!@#$%^&*";

    for (let i = 0; i < length; i++) {
      let charPos = Math.floor(Math.random() * charSet.length + 1);

      password += charSet.charAt(charPos);
    }

    setPassword(password);
  });

  function copyPassword() {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charactersAllowed]);

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col align-middle justify-center gap-8 p-6">
      <div className="bg-slate-700 rounded-xl p-5 min-w-[490px] w-fit h-fit mx-auto">
        {/* Title */}
        <h1 className="text-2xl text-amber-300 text-center mb-5">
          Password Generator
        </h1>
        {/* Display */}
        <div className="flex flex-row rounded-lg overflow-hidden mb-5">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="text-xl py-2 px-3 w-full outline-none"
            placeholder="Password"
          />
          <button
            className="py-2 px-3 text-xl bg-amber-500 text-amber-800 hover:text-amber-100 duration-100"
            onClick={() => {
              copyPassword();
            }}
          >
            Copy
          </button>
        </div>
        {/* Settings */}
        <div className="flex flex-row gap-2 justify-center align-middle flex-wrap text-lg text-amber-400 mb-5">
          <input
            type="range"
            min={5}
            max={25}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
          <input
            type="checkbox"
            defaultChecked={numbersAllowed}
            onChange={() => {
              setNumbersAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charactersAllowed}
            onChange={() => {
              setCharactersAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
        {/* Regenerate button */}
        <button
          className="py-2 px-3 bg-amber-500 text-white text-xl block mx-auto rounded-lg border-4 border-slate-700 focus:border-slate-300 duration-100"
          onClick={() => {
            generatePassword();
          }}
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default App;
