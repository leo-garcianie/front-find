import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Results from './pages/Results';
import Details from './pages/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/results" element={<Results />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
