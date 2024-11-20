import { Route, Routes, BrowserRouter } from "react-router-dom"
import ComponentTesterPage from "./pages/ComponentTesterPage"
import StudentDashboardPage from "./pages/StudentDashboardPage"
import StudentClass from "./pages/StudentClass"


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/comptest" element={<ComponentTesterPage />}/>
    <Route path="/student/dashboard" element={<StudentDashboardPage />}/>
    <Route path="/student/class/:id" element={<StudentClass />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
