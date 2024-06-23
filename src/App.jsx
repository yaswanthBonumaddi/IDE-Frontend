import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProjectLoader from './ProjectLoader';
import Pro from './Pro';

const App = () => {
  return (
    <Router>
        <Routes>
          {/* <Route path="/" exact element={<ProjectLoader/>}/> */}
          <Route path="/" element={<Pro/>}/>
        </Routes>
    </Router>
  );
};

export default App;
