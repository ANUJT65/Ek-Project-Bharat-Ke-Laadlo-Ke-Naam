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
import CommonSignupPage from "./pages/CommonSignupPage"
import CommonLoginPage from "./pages/CommonLoginPage"
import TeacherEngagementAnalytics from "./pages/TeacherEngagementAnalytics"
import PDFTest from "./pages/PDFTest"

import { UserProvider } from "./contexts/userContext"
import { TeacherdbProvider } from "./contexts/teacherdbContext"
import { StudentDBProvider } from "./contexts/StudentDBContext"
import SingleResourcePage from "./pages/SingleResourcePage"
import GovernmentDashboard from "./pages/GovernmentDashboard"
import { GovernmentProvider } from "./contexts/GovernmentDBContext"
import Homepage from "./pages/Homepage"
import CommonLoginPage2 from "./pages/CommonLoginPage2"
import StudentVocationalLearning2 from "./pages/StudentVocationalLearning2"


function App() {

  return (
    <BrowserRouter>
    <UserProvider>
    <TeacherdbProvider>
    <StudentDBProvider>
    <GovernmentProvider>
    <Routes>
      {/*Common Routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/comptest" element={<ComponentTesterPage />}/>
      <Route path="/auth/login" element={<CommonLoginPage2 />}/>
      <Route path="/auth/signup" element={<CommonSignupPage />}/>
      <Route path="/test/pdf" element={<PDFTest />}/>

      {/*Student Routes */}
      
      <Route path="/student/dashboard" element={<StudentDashboardPage />}/>
      <Route path="/student/class/:id" element={<StudentClass />} />
      <Route path="/student/subject/:name" element={<StudentSingleSubjectPage />} />
      <Route path="/student/vocational-learning" element={<StudentVocationalLearning2 />} />
      <Route path="/student/calendar/" element={<StudentCalendar />} />
      <Route path="/student/lecture/recorded/:id" element={<RecordedLecturePage />} />

      {/*Teacher Routes */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/subject/:name" element={<TeacherSingleSubjectPage />} />
      <Route path="/teacher/engagement-analytics/:video" element={<TeacherEngagementAnalytics />} />
      <Route path="/teacher/resource/:id" element={<SingleResourcePage />} />

      {/*Government Routes */}
      <Route path="/government/dashboard/" element={<GovernmentDashboard />} />
      
    </Routes>
    
    </GovernmentProvider>
    </StudentDBProvider>
    </TeacherdbProvider>
    </UserProvider>
    </BrowserRouter>
  )
}

export default App
