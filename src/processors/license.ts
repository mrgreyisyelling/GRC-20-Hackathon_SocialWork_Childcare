import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';

export function processLicense(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Create License entity and attributes
  const licenseOp = getOrCreateEntity("License", data);
  const attributes = getOrCreateAttributes("License", data);

  // Create related entities
  const facilityOp = getOrCreateEntity("Facility", data);
  const licenseTypeOp = getOrCreateEntity("LicenseType", data);
  const issueDateOp = getOrCreateEntity("Date", { date_value: data.license_issue_date });
  const expiryDateOp = getOrCreateEntity("Date", { date_value: data.license_expiry_date });

  // Create relationships
  const relationships = [
    getOrCreateRelationship(licenseOp.id, facilityOp.id, "GRANTED_TO"),
    getOrCreateRelationship(licenseOp.id, licenseTypeOp.id, "HAS_TYPE"),
    getOrCreateRelationship(licenseOp.id, issueDateOp.id, "ISSUED_ON"),
    getOrCreateRelationship(licenseOp.id, expiryDateOp.id, "EXPIRES_ON"),
  ];

  return [licenseOp, ...attributes, facilityOp, licenseTypeOp, issueDateOp, expiryDateOp, ...relationships];
}
