const express = require("express");
const Category = require("../models/microorganisms");
const {
  addMicroorganism,
  findMicroorganism,
  deleteMicroorganism,
  updateMicroorganism,
  fetchData,
} = require("../controller/microorganism_database");

const {
  ValidateAddMicroorganismRequest,
  ValidateDeleteMicroorganismRequest,
  ValidateUpdateMicroorganismRequest,
} = require("../validators/microorganismRecordValidator");
const { RequireSignin } = require("../common-used/index");
const { checkPermission } = require("../validators/checkPermission");
const router = express.Router();

router.post(
  "/addmicroorganism",
  RequireSignin,
  checkPermission("addMicroorganism"),
  ValidateAddMicroorganismRequest,
  addMicroorganism
);
router.post(
  "/findmicroorganism",
  RequireSignin,
  checkPermission("viewMicroorganism"),
  findMicroorganism
);
router.post(
  "/deletemicroorganism",
  RequireSignin,
  checkPermission("deleteMicroorganism"),
  ValidateDeleteMicroorganismRequest,
  deleteMicroorganism
);
router.post(
  "/updatemicroorganism",
  RequireSignin,
  checkPermission("updateMicroorganism"),
  ValidateUpdateMicroorganismRequest,
  updateMicroorganism
);

router.get("/fetchData", fetchData);

module.exports = router;
