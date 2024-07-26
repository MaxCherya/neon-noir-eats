// libraries
import React from 'react'

// styles
import './notFound.css'

// icons
import { TbFaceIdError } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className='nf-body'>
        <p>Page is not found</p>
        <TbFaceIdError />
    </div>
  )
}
