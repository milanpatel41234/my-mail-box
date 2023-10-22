import React from 'react'
import { useSelector } from 'react-redux'

function ShowCurrentMail() {
    const Mail = useSelector(state=>state.Mail.item)
  return (
   <div style={{color:'black'}}>
    <h4>{Mail.from}</h4>
    <b>{Mail.subject}</b>
    <p>{Mail.emailcontaint}</p>
   </div>
  )
}

export default ShowCurrentMail
