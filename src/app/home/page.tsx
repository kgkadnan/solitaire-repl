"use client"
import React, { useState } from 'react'

const page = () => {
    const [post , setPost] = useState("")
  return (
    <div>page {post}   </div>
  )
}

export default page