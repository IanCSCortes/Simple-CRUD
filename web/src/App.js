import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage';
import Authenticate from "./pages//authenticate";
import CreateStudent from './pages/students/create';
import Students from './pages/students';
import EditStudent from "./pages/students/edit";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Authenticate />} />
          <Route path="/students/create" element={<CreateStudent />} />
          <Route path="/students" element ={<Students />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="*" element={<>Não encontrado</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
