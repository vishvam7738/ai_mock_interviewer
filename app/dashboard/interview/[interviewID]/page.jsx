"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterviw } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState();

  useEffect(() => {
    console.log(params.interviewID);
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterviw)
      .where(eq(MockInterviw.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
            <div className="flex flex-col p-5 rounded-lg border gap-5">
          <h2 className="text-lg">
            <strong>Job Role/Job Position: </strong>
            {interviewData.jobPosition}
          </h2>
          <h2 className="text-lg">
            <strong>Job Description/Tech Stack: </strong>
            {interviewData.jobDesc}
          </h2>
          <h2 className="text-lg">
            <strong>Years of Experience: </strong>
            {interviewData.jobExperience}
          </h2>
          </div>
          <div>
            
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;