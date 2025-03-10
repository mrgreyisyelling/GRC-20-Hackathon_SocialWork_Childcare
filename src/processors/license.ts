import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from './utils.js';

export function processLicense(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  const licenseId = getOrCreateEntity("License", data);
  const attributes = getOrCreateAttributes("License", data);

  const facilityId = getOrCreateEntity("Facility", data);
  const licenseTypeId = getOrCreateEntity("LicenseType", data);
  const issueDateId = getOrCreateEntity("Date", { date_value: data.license_issue_date });
  const expiryDateId = getOrCreateEntity("Date", { date_value: data.license_expiry_date });

  const relationships = [
    getOrCreateRelationship(licenseId, facilityId, "GRANTED_TO"),
    getOrCreateRelationship(licenseId, licenseTypeId, "HAS_TYPE"),
    getOrCreateRelationship(licenseId, issueDateId, "ISSUED_ON"),
    getOrCreateRelationship(licenseId, expiryDateId, "EXPIRES_ON"),
  ];

  return [...ops, ...attributes, ...relationships];
}
