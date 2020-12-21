exports.ValidateAddMicroorganismRequest = (req, res, next) => {
  const { CoreDataSets, StrainAdministration, EnviromentAndHistory } = req.body;
  if (
    checkCoreDataSets(CoreDataSets) &&
    checkStrainAdministration(StrainAdministration) &&
    checkEnviromentAndHistory(EnviromentAndHistory)
  ) {
    var errors = {};
    if (!checkValue(StrainAdministration.BioHazardLevel, 1, 4)) {
      errors.BioHazardLevel = "The bio Hazard Level is not in the normal range";
    }
    if (!checkAccesionNumber(CoreDataSets.AccessionNumber)) {
      errors.AccessionNumber =
        "The Accession Number does not follow the format";
    }
    if (!checkvalidDate(StrainAdministration.DateOfAccession)) {
      errors.AccesionDate = "Accession Date is wrong";
    }
    if (!checkYear(EnviromentAndHistory.DateOfCollection)) {
      errors.CollectionYear = "Collection Date is wrong";
    }
    if (!checkvalidDate(EnviromentAndHistory.DateOfIdentification)) {
      errors.IdentificationDate = "DateOfIdentification Date is wrong";
    }
    if (!checkvalidDate(EnviromentAndHistory.DateOfDeposition)) {
      errors.DepositionDate = "Date of Deposition is incorrect";
    }

    if (!checkOrganismType(CoreDataSets.OrganismType)) {
      errors.OrganismType = "Organism Type is incorrect";
    }
    if (!checkStatus(CoreDataSets.Status)) {
      errors.Status = "Status has an incorrect value";
    }

    if (Object.entries(errors).length > 0) {
      return res.json({
        errors,
      });
    }
    next();
  } else {
    res.json({
      Message: "The request lacks required information.",
    });
  }
};

exports.ValidateDeleteMicroorganismRequest = (req, res, next) => {
  if (req.body.AccessionNumber) {
    next();
  } else {
    return res.status(200).json({
      message: "The Accession Number is missing",
    });
  }
};
exports.ValidateUpdateMicroorganismRequest = (req, res, next) => {
  if (req.body.AccessionNumber) {
    next();
  } else {
    return res.status(200).json({
      message: "The Accession Number is missing",
    });
  }
};

checkCoreDataSets = (cds) => {
  return (
    cds.Genus &&
    cds.Genus != "" &&
    cds.AccessionNumber &&
    cds.AccessionNumber != "" &&
    cds.Author &&
    cds.Author != "" &&
    cds.OrganismType &&
    cds.OrganismType != "" &&
    cds.HistoryOfDeposit &&
    cds.HistoryOfDeposit != "" &&
    cds.DateOfIsolation &&
    cds.DateOfIsolation != "" &&
    cds.IsolatedFrom &&
    cds.IsolatedFrom != "" &&
    cds.GeographicOrigin &&
    cds.GeographicOrigin != "" &&
    cds.Status &&
    cds.Status != "" &&
    cds.GrowthTemperatures.OptimumGrowthTemperature &&
    cds.GrowthTemperatures.OptimumGrowthTemperature != "" &&
    cds.GrowthTemperatures.MaximumGrowthTemperature &&
    cds.GrowthTemperatures.MinimumGrowthTemperature &&
    cds.Medium &&
    cds.Medium != ""
  );
};

checkStrainAdministration = (StrainAdministration) => {
  return (
    StrainAdministration.DateOfAccession &&
    StrainAdministration.ModeOfPreservation &&
    StrainAdministration.BioHazardLevel &&
    StrainAdministration.MTA &&
    StrainAdministration.DistributionRestriction
  );
};

checkEnviromentAndHistory = (EnviromentAndHistory) => {
  return (
    EnviromentAndHistory.DateOfCollection &&
    EnviromentAndHistory.CountryOfCollection &&
    EnviromentAndHistory.RegionOfCollection &&
    EnviromentAndHistory.CollectedBy &&
    EnviromentAndHistory.IsolatedBy &&
    EnviromentAndHistory.IdentifiedBy &&
    EnviromentAndHistory.DateOfIdentification &&
    EnviromentAndHistory.DepositedBy &&
    EnviromentAndHistory.DateOfDeposition
  );
};

checkAccesionNumber = (AccessionNumber) => {
  return (
    AccessionNumber.length >= 6 && AccessionNumber.substring(0, 5) === "NCCP-"
  );
};

checkValue = (number, minimum, maximum) => {
  return number >= minimum && number <= maximum;
};

checkvalidDate = (stringDate) => {
  date = stringDate.trim().split("/");
  date = new Date(date[2], date[1], date[0]);
  today = new Date();
  return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(stringDate) && date <= today;
};

checkYear = (year) => {
  return year <= new Date().getFullYear();
};

checkOrganismType = (type) => {
  return (
    type == "Bacteria" ||
    type == "Algae" ||
    type == "Archaea" ||
    type == "Antibody" ||
    type == "Fungi" ||
    type == "MicroAlgae" ||
    type == "Phage" ||
    type == "Virus" ||
    type == "Yeast"
  );
};

checkStatus = (status) => {
  return status.toLowerCase() == "type" || status.toLowerCase() == "no";
};
