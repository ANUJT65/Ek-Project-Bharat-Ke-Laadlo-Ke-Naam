import { Route, Routes, BrowserRouter } from "react-router-dom"
import ComponentTesterPage from "./pages/ComponentTesterPage"
import StudentDashboardPage from "./pages/StudentDashboardPage"
import StudentClass from "./pages/StudentClass"
import StudentSingleSubjectPage from "./pages/StudentSingleSubjectPage"
import StudentCalendar from "./pages/StudentCalendar"
import TeacherDashboard from "./pages/TeacherDashboard"
import StudentVocationalLearningPage from "./pages/StudentVocationalLearningPage"
import TeacherSingleSubjectPage from "./pages/TeacherSingleSubjectPage"
import RecordedLecturePage from "./pages/RecordedLecturePage"


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/comptest" element={<ComponentTesterPage />}/>
    <Route path="/student/dashboard" element={<StudentDashboardPage />}/>
    <Route path="/student/class/:id" element={<StudentClass />} />
    <Route path="/student/subject/:name" element={<StudentSingleSubjectPage />} />
    <Route path="/student/vocational-learning" element={<StudentVocationalLearningPage />} />
    <Route path="/student/calendar/" element={<StudentCalendar />} />
    <Route path="/student/lecture/recorded/:id" element={<RecordedLecturePage />} />
    <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
    <Route path="/teacher/subject/:name" element={<TeacherSingleSubjectPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
