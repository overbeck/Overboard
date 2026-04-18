import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Systems from './pages/Systems';
import SystemDetail from './pages/systems/SystemDetail';
import Schematics from './pages/Schematics';
import Parts from './pages/Parts';
import Media from './pages/Media';
import Knowledge from './pages/Knowledge';
import Repos from './pages/Repos';
import StepFiles from './pages/StepFiles';
import Strategy from './pages/Strategy';

export default function App() {
  return (
    <BrowserRouter basename="/overboard">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="strategy" element={<Strategy />} />
          <Route path="systems" element={<Systems />} />
          <Route path="systems/:id" element={<SystemDetail />} />
          <Route path="schematics" element={<Schematics />} />
          <Route path="parts" element={<Parts />} />
          <Route path="media" element={<Media />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="repos" element={<Repos />} />
          <Route path="step-files" element={<StepFiles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
