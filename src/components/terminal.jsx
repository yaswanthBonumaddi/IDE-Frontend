// Terminal.jsx
import { Terminal as XTerminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import socket from "../socket";

import "@xterm/xterm/css/xterm.css";

const Terminal = () => {
  const terminalRef = useRef();
  const isRendered = useRef(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const term = new XTerminal({
      rows: 15,
    });

    term.open(terminalRef.current);
    term.write('Hello from \x1B[1;3;31myashnode\x1B[0m click ENTER to start terminal:')
    // elonsteve@jarvis:~/Downloads/CodeYantra-main/server/user$ 
    term.onData((data) => {
      socket.emit("terminal:write", data);
    });

    function onTerminalData(data) {
      term.write(data);
    }

    socket.on("terminal:data", onTerminalData);
  }, []);

  return (
    <div
      ref={terminalRef}
      id="terminal"
      className="bg-white rounded p-2 text-sm font-mono w-full"
    />
  );
};

export default Terminal;
