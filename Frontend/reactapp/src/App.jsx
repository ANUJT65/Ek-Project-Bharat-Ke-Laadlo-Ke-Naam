import { Route, Routes, BrowserRouter } from "react-router-dom"
import ComponentTesterPage from "./pages/ComponentTesterPage"
import StudentDashboardPage from "./pages/StudentDashboardPage"


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/comptest" element={<ComponentTesterPage />}/>
    <Route path="/student/dashboard" element={<StudentDashboardPage />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
