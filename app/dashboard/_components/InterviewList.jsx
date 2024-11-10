"use client"
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList=()=> {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress))
      .orderBy(desc(MockInterview.id));

    console.log(result);
    setInterviewList(result);
  };
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      <div>
        {interviewList&&interviewList.map((interview,index)=>(
            <InterviewItemCard key={index}/>
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
