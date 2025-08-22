import { Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './App.css';
import { Home } from './Home';
import { useLocalStorage } from './useLocalStorage';
import { mockTasks } from './mocks';
import { Tasks } from './components/Tasks';
import { TaskItem } from './components/TaskItem';
import { Map } from './components/Map';
import { Navigation } from './components/Navigation';
import { Confetti } from './components/confetti';

function App() {
  useLocalStorage('mocks', mockTasks);
  
  return (
    <div className="App">
        <Confetti />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskItem />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/:id" element={<Map />} />
        </Routes>
        <Navigation />
    </div>
  );
}

export default App;
