const express = require('express')
const router = express.Router()
//controllers
const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs')

//routes
router.route('/').get(getAllJobs).post(createJob)

//specific job
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router