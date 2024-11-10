"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  

const Feedback = ({params}) => {

    const [feedbackList,setFeedbackList]=useState([])
    useEffect(()=>{
        GetFeedback()
    },[])

    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,params.interviewID))
        .orderBy(UserAnswer.id);

        console.log(result)
        setFeedbackList(result)
    }
  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index}>
        <CollapsibleTrigger>
        {item.question}
        </CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
      
      ))}
    </div>
  )
}

export default Feedback
