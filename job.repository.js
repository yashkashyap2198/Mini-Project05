// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from 'mongoose';
import { jobSchema } from './schema/newJob.schema.js';
import { applyJobSchema } from './schema/applyJob.schema.js';

const JobModel=new mongoose.model('Job',jobSchema)
const ApplyJobModel=new mongoose.model('Appication',applyJobSchema);

export const createNewJob = async (job) => {
  // Write your code here
  const newJob=new JobModel(job);
  await newJob.save();
  return newJob;
};

export const applyJobRepo = async (jobId, userId) => {
  // Write your code here
  const existingApplication=await ApplyJobModel.findOne({ jobId, userId})

  if(existingApplication){
    throw new Error("You have already apply for this job");
  }
  const result=await JobModel.findByIdAndUpdate(
    jobId,
    {$push:{applicants:{userId}}},
    {new:true}
  )
  if(!result){
    throw new Error("Job not found")
  }
  return result;
};
export const findJobRepo = async (_id) => {
  // Write your code here
  const job=await JobModel.findById(_id);
  return job;
};
