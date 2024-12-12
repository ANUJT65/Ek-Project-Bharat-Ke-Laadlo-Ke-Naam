import React from 'react'
import { useParams } from 'react-router-dom'
import StudentClassPoll from '../components/StudentClassPoll';

const StudentQuiz = () => {
    const {id} = useParams();

  return (
    <StudentClassPoll id={id} />
  )
}

export default StudentQuiz