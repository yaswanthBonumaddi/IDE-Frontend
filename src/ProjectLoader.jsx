import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProjectLoader = () => {
  const navigate = useNavigate();
  const [gitUrl, setGitUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8888/load-project', { gitUrl });
      console.log(response.data); // Handle success response
      navigate('/home')
      // Redirect or navigate to the page where user can start working on the project
    } catch (error) {
      setError('Failed to load project. Please check your Git URL.');
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Git Project URL:
          <input
            type="text"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          {isLoading ? 'Loading...' : 'Load Project'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ProjectLoader;
