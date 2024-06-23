import { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-json";
import "./assets/theme-custom"; // Import the custom theme
import FileTree from "./components/tree";
import Terminal from "./components/terminal";
import LoadingAnimation from "./components/LoadingAnimation";
import logo from "./assets/logo1.png";
import Modal from "react-modal";
Modal.setAppElement("#root");

import socket from "./socket";

import "./App.css";
function Pro() {
  const [fileTree, setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openFiles, setOpenFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selection, setSelection] = useState(null);
  const [editorTheme, setEditorTheme] = useState("custom");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isCopied, setIsCopied] = useState(false);
  const [codingTime, setCodingTime] = useState(0);
  const [isSaved, setIsSaved] = useState(selectedFileContent === code);

  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // Simulate a delay to show the loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Change the delay duration as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const fileExtension = selectedFile.split(".").pop().toLowerCase();

      let languageMode;
      switch (fileExtension) {
        case "js":
          languageMode = "javascript";
          break;
        case "json":
          languageMode = "json";
          break;
        case "md":
          languageMode = "markdown";
          break;
        case "html":
          languageMode = "html";
          break;
        case "css":
          languageMode = "css";
          break;
        case "xml":
          languageMode = "xml";
          break;
        case "java":
          languageMode = "java";
          break;
        case "py":
          languageMode = "python";
          break;
        case "php":
          languageMode = "php";
          break;
        case "rb":
          languageMode = "ruby";
          break;
        case "c":
          languageMode = "clike";
          break;
        case "cpp":
          languageMode = "cpp";
          break;
        case "cs":
          languageMode = "csharp";
          break;
        case "go":
          languageMode = "go";
          break;
        case "swift":
          languageMode = "swift";
          break;
        // Add more cases for other file types as needed
        default:
          languageMode = "text";
      }

      setSelectedLanguage(languageMode);
    }
  }, [selectedFile]);

  const saveFile = async () => {
    if (!selectedFile) return;
    const response = await fetch(`http://localhost:8888/files/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: selectedFile,
        content: code,
      }),
    });

    if (response.ok) {
      setSelectedFileContent(code);
      setIsSaved(true);
    } else {
      alert("Failed to save the file.");
    }
  };

  const getFileTree = async () => {
    try {
      const response = await fetch("http://localhost:8888/files");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setFileTree(result.tree);
    } catch (error) {
      console.error("Failed to fetch file tree:", error);
      alert(
        "Failed to fetch file tree. Please check the server and try again."
      );
    }
  };

  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    const response = await fetch(
      `http://localhost:8888/files/content?path=${selectedFile}`
    );
    const result = await response.json();
    setSelectedFileContent(result.content);
  }, [selectedFile]);

  const handleSearch = () => {
    const lowerCaseCode = code.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const startIndex = lowerCaseCode.indexOf(lowerCaseSearchTerm);
    if (startIndex !== -1) {
      const endIndex = startIndex + searchTerm.length;
      setSelection({ start: startIndex, end: endIndex });
    } else {
      setSelection(null);
    }
  };

  // Add event listener for Ctrl+S
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveFile();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFile, code]);

  useEffect(() => {
    getFileTree();
  }, []);

  useEffect(() => {
    if (!isSaved && code) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, isSaved]);
  useEffect(() => {
    setCode(selectedFileContent);
  }, [selectedFileContent]);

  useEffect(() => {
    if (selectedFile) getFileContents();
  }, [getFileContents, selectedFile]);

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);

  const handleFileSelect = (path) => {
    if (!openFiles.includes(path)) {
      setOpenFiles([...openFiles, path]);
    }
    setSelectedFile(path);
    setSelectedFileContent("");
    setCode("");
    setIsSaved(true);
    setIsCopied(false);
  };


  const handleCloseFile = (path) => {
    const updatedOpenFiles = openFiles.filter((file) => file !== path);
  
    // Get the current index of selectedFile in openFiles
    const selectedIndex = openFiles.indexOf(selectedFile);
  
    let newSelectedFile = selectedFile;
  
    if (selectedIndex !== -1) {
      // Check if selectedFile is not the first item
      if (selectedIndex !== 0) {
        newSelectedFile = openFiles[selectedIndex - 1]; // Select the previous file
      } else {
        // selectedIndex is 0, select the next file if there's more than one file left
        if (openFiles.length > 1) {
          newSelectedFile = openFiles[selectedIndex + 1];
        } else {
          newSelectedFile = ""; // No files left
        }
      }
    }
  
    setOpenFiles(updatedOpenFiles);
    setSelectedFile(newSelectedFile);
    setSelectedFileContent(""); // Clear content and code
    setCode("");
    setIsSaved(true);
    setIsCopied(false);
  };
  

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = Object.keys(fileTree).filter((path) =>
        path.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, fileTree]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code); // Copy code to clipboard
    setIsCopied(true); // Set copied state to true
    setTimeout(() => setIsCopied(false), 5000); // Reset isCopied state after 5 seconds
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCodingTime((prevTime) => prevTime + 1);
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  
  return (
    <div className="flex h-screen bg-neutral-900 font-sans no-scrollbar">
      <LoadingAnimation isLoading={isLoading} />

      <div className="flex flex-col bg-neutral-800 text-white w-full">
        {/* Top Navigation Bar */}
        <nav className="flex items-center justify-between bg-neutral-800 text-white p-4">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="w-12 h-12 mr-2 mb-1" />
            <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-pink-500 text-transparent bg-clip-text ">
              Yashnode
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleCopyCode}
              className="bg-[#ffffff17] text-white px-3 py-2 rounded-md focus:outline-none flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              {isCopied ? "Copied" : "Copy Code"}
            </button>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#ffffff17] text-white px-3 py-2 pr-10 rounded-md focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 px-3 py-2 bg-[#ffffff20] text-white rounded-md focus:outline-none"
              >
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="10" cy="10" r="7" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 15l5 5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-1">
          {searchResults.length > 0 && (
            <h2 className="text-xl font-semibold mb-2 ml-4">Search Results</h2>
          )}
          <ul>
            {searchResults.map((result) => (
              <li
                key={result}
                onClick={() => handleFileSelect(`\\${result}`)}
                className="cursor-pointer hover:text-gray-400  ml-4"
              >
                {result}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } lg:block bg-neutral-900 text-white p-4 overflow-y-auto overflow-x-hidden w-72 border-r border-white transition-all duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-row">
                <span className="mt-1 mr-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    ></path>
                  </svg>
                </span>
                <span className="text-xl font-medium mt-[1px]">
                  File Explorer
                </span>
              </div>

              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <FileTree
              onSelect={handleFileSelect}
              tree={fileTree}
              selectedFile={selectedFile} // Pass the selectedFile prop here
            />
          </div>
          <div className="flex-1 flex flex-col bg-neutral-800 overflow-auto no-scrollbar">
            {/* Tab Bar */}
            <div className="bg-neutral-900 text-white flex space-x-2 p-2">
              {openFiles.map((file) => (
                <div
                  key={file}
                  className={`flex items-center cursor-pointer p-2 rounded-t-md ${
                    selectedFile === file
                      ? "bg-neutral-700 text-[#c4ff45]"
                      : "bg-neutral-900 hover:bg-neutral-700"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"></path>
                  </svg>
                  <span onClick={() => handleFileSelect(file)} className="mr-2">
                    {file.split("/").pop()}
                  </span>
                  {selectedFile === file && selectedFileContent !== code && (
                    <svg height="12" width="12" xmlns="http://www.w3.org/2000/svg">
                    <circle r="4" cx="6" cy="6" fill="white" />
                  </svg>
                  )}

                  <button
                    onClick={() => handleCloseFile(file)}
                    className="text-red-400 hover:text-red-600 focus:outline-none"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            {/* Code Editor */}
            <div className=" bg-neutral-800 p-4 relative overflow-auto h-[600px]">
              {openFiles.length === 0 ? (
                null
              ) : (
                selectedFile && (
                  <p className="text-sm mb-2 text-gray-400">
                    {selectedFile.replaceAll("/", " > ")}
                  </p>
                )
              )}
              {openFiles.length === 0 ? <div className="welcome-message" style={welcomeStyles}>
          <h2>Welcome to YashNode</h2>
          <p>Select any file to get started!</p>
          {/* Add more styling or content as needed */}
        </div>:
              <AceEditor
                width="100%"
                height="inherit"
                mode={selectedLanguage}
                value={code}
                onChange={(newValue) => setCode(newValue)}
                name="custom_ace_editor"
                editorProps={{ $blockScrolling: Infinity }}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                fontSize={16}
                className="h-[300px] rounded" // Adjust the height here
                showPrintMargin={false}
                style={{
                  backgroundColor: "#272822",
                  color: "#f8f8f2",
                  fontFamily: "Cascadia Code, monospace",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  lineHeight: "1.6", // Adjust as needed
                }}
                theme={editorTheme}
              />}
              
            </div>
            <div className="bg-neutral-800 text-white p-4 flex items-center justify-between font-mono">
              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const welcomeStyles = {
  backgroundColor: '#f0f0f0',
  color: '#333',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  margin: '20px auto',
};

export default Pro;
