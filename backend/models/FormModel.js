const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  client: String,
  changeRequestNo: String,
  project: String,
  requester: String,
  date: String,
  departmentLocation: String,
  phoneNo: String,
  changeDescription: String,
  changeNeededBy: String,
  reasonForChange: String,
  approver: String,
  changeType: {
    application: Boolean,
    database: Boolean,
    hardware: Boolean,
    procedures: Boolean,
    network: Boolean,
    security: Boolean,
    operatingSystem: Boolean,
    schedule: Boolean,
  },
  changePriority: {
    urgent: Boolean,
    high: Boolean,
    medium: Boolean,
    low: Boolean,
  },
  changeImpact: {
    minor: Boolean,
    medium: Boolean,
    major: Boolean,
  },
  environmentsImpacted: String,
  resourceRequirements: String,
  testPlanDescription: String,
  changeRequestStatus: {
    accepted: Boolean,
    rejected: Boolean,
  },
  comments: String,
  changeScheduled: String,
  implementationAssigned: String,
  technology: String,
  policy: String,
  ipAddressUrlPort: String,
  rollBack: String,
  stagingTestResults: String,
  implementationTestResults: String,
  dateOfImplementation: String,
  implementationStatus: String,
  cabSignOffDate: String,
});

// Create and export the model
module.exports = mongoose.model("FormData", formSchema); // Collection name: FormData