import logo from './logo.svg';
import './App.scss';
import AddData from './Components/AddData';
import GetData from './Components/ViewData';
import EditData from './Components/EditData'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route exact path="/AddData" element={<AddData></AddData>}></Route>
      <Route exact path="/" element={<GetData></GetData>}></Route>
      <Route exact path="/EditData/:id" element={<EditData></EditData>}></Route> 
     </Routes>
     
    </div>
  );
}

export default App;
