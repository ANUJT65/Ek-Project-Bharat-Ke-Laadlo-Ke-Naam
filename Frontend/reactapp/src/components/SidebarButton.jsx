import React from 'react'
import { useNavigate } from "react-router-dom";

const SidebarButton = ({name, link}) => {
    const navigate = useNavigate();
    const handlebuttonClick = (link) =>{
        navigate(`./${link}`);
    }
  return (
    <button className='shadow-md text-left w-3/4 mt-1 bg-white p-2 rounded-md border border[#BEBEBE] border-2' onClick={()=> handlebuttonClick(link)}>{name}</button>
  )
}

export default SidebarButton