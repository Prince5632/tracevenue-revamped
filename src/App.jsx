import './App.css'
import ComponentDocs from './pages/ComponentDocs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    // <ComponentDocs />

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComponentDocs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
