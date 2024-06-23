// import React, { useState } from "react";

// const FileTreeNode = ({ fileName, nodes, onSelect, path, selectedFile }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const isDir = !!nodes;
//   const isSelected = path === selectedFile;

//   const handleToggle = () => {
//     if (isDir) setIsOpen(!isOpen);
//   };

//   return (
//     <div className="mb-2">
//       <div
//         onClick={(e) => {
//           e.stopPropagation();
//           handleToggle();
//           if (!isDir) onSelect(path);
//         }}
//         className={`flex items-center cursor-pointer ${
//           isDir
//             ? "text-[#d4d4d4] hover:text-[#5ee694]"
//             : isSelected
//             ? "bg-[#c4ff45] text-black font-semibold p-1 rounded-md mr-5"
//             : "text-white hover:text-[#c4ff45]"
//         }`}
//       >
//         {isDir ? (
//           <svg
//             className={`w-4 h-4 mr-2 transform transition-transform ${
//               isOpen ? "rotate-90" : ""
//             }`}
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path d="M10 6L16 12L10 18"></path>
//           </svg>
//         ) : (
//           <svg
//             className="w-4 h-4 mr-2"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"></path>
//           </svg>
//         )}
//         {fileName}
//       </div>
//       {isOpen && (
//         <div className="ml-4">
//           {nodes &&
//             Object.keys(nodes).map((node) => (
//               <FileTreeNode
//                 key={node}
//                 fileName={node}
//                 nodes={nodes[node]}
//                 onSelect={onSelect}
//                 path={`${path}/${node}`}
//                 selectedFile={selectedFile}
//               />
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const FileTree = ({ tree, onSelect, selectedFile }) => {
//   return (
//     <div className="space-y-2 bg-[#1f1f1f] text-white p-4 overflow-y-auto w-72 border-r border-white">
//       <FileTreeNode
//         onSelect={onSelect}
//         fileName="/"
//         path=""
//         nodes={tree}
//         selectedFile={selectedFile}
//       />
//     </div>
//   );
// };

// export default FileTree;


import React, { useState } from 'react';
import { getFileIcon } from '../utils/getFileMode';

const FileTreeNode = ({ fileName, nodes, onSelect, path, selectedFile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDir = !!nodes;
  const isSelected = path === selectedFile;

  const handleToggle = () => {
    if (isDir) setIsOpen(!isOpen);
  };

  const fileIcon = getFileIcon(fileName);
// console.log("fileIcon"fileIcon)
  return (
    <div className="mb-2">
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
          if (!isDir) onSelect(path);
        }}
        className={`flex items-center cursor-pointer ${
          isDir
            ? 'text-[#d4d4d4] hover:text-[#5ee694]'
            : isSelected
            ? 'bg-[#c4ff45] text-black font-semibold p-1 rounded-md mr-5'
            : 'text-white hover:text-[#c4ff45]'
        }`}
      >
        {isDir ? (
          <svg
            className={`w-4 h-4 mr-2 transform transition-transform ${
              isOpen ? 'rotate-90' : ''
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 6L16 12L10 18"></path>
          </svg>
        ) : (
          <img src={fileIcon} className="w-4 h-4 mr-2" alt={`${fileName} icon`} />
        )}
        {fileName}
      </div>
      {isOpen && (
        <div className="ml-4">
          {nodes &&
            Object.keys(nodes).map((node) => (
              <FileTreeNode
                key={node}
                fileName={node}
                nodes={nodes[node]}
                onSelect={onSelect}
                path={`${path}/${node}`}
                selectedFile={selectedFile}
              />
            ))}
        </div>
      )}
    </div>
  );
};



// import FileTreeNode from './FileTreeNode';

const FileTree = ({ tree, onSelect, selectedFile }) => {
  return (
    <div className="space-y-2 bg-[#1f1f1f] text-white p-4 overflow-y-auto w-72 border-r border-white">
      <FileTreeNode
        onSelect={onSelect}
        fileName="/"
        path=""
        nodes={tree}
        selectedFile={selectedFile}
      />
    </div>
  );
};

export default FileTree;
