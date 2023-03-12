const Job = require('../models/Job')
const User = require("../models/User")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')

const getAllJobs =async (req, res)=>{
    // get all the jobs created by a user
    // const userId= req.user.id;
    // const user = await User.findOne({_id: userId})
    // const jobs = await Job.find({createdBy: user})
    // res.status(StatusCodes.OK).json(jobs)
    const jobs = await Job.find({createdBy: req.user.id})
    res.status(StatusCodes.OK).json({jobs, nHits: jobs.length})
}
const createJob = async (req, res)=>{
    req.body.createdBy = req.user.id;
    const job =await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job)
    
}

const getJob = async (req, res)=>{
    const {user :{id:userId}, params:{id:jobId}} = req;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })
    if(!job) throw new NotFoundError('The job isnt available, Sorry');
    //succesfuly found the job
    res.status(StatusCodes.OK).json({job, nHits:1})


}
const updateJob =async (req, res)=>{
    const {user:{id:userId},
            params:{id:jobId},
        body: {company, position}} = req;
    if(company==='' || position ==="") throw new BadRequestError('The request you made is invalid');
    const job =await Job.findByIdAndUpdate({_id:jobId, createdBy:userId},req.body, {new:true, runValidators:true});
    //not found
    if(!job) throw new NotFoundError('No job with the id ' + jobId);
    res.status(StatusCodes.CREATED).json({job})
}
const deleteJob =async (req, res)=>{
    const { params:{id:jobId}, user:{id:userId}} = req;
    const job = await Job.findByIdAndRemove({_id:jobId, createdBy:userId});
    if(!job) throw new NotFoundError('Job not found, Sorry!');
    res.status(StatusCodes.OK).json(job)
}

module.exports= {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}