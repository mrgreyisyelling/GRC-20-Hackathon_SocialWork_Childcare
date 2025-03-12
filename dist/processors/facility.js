import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';
export function processFacility(data) {
    const ops = [];
    // Create Facility entity and attributes
    const facilityOp = getOrCreateEntity("Facility", data);
    const attributes = getOrCreateAttributes("Facility", data);
    // Create related entities
    const locationOp = getOrCreateEntity("Location", data);
    const ownerOp = getOrCreateEntity("Owner", data);
    const licenseOp = getOrCreateEntity("License", data);
    const schoolDistrictOp = getOrCreateEntity("SchoolDistrict", data);
    const scheduleOp = getOrCreateEntity("Schedule", data);
    // Create relationships
    const relationships = [
        getOrCreateRelationship(facilityOp.id, locationOp.id, "LOCATED_AT"),
        getOrCreateRelationship(facilityOp.id, ownerOp.id, "OWNED_BY"),
        getOrCreateRelationship(facilityOp.id, licenseOp.id, "LICENSED_UNDER"),
        getOrCreateRelationship(facilityOp.id, schoolDistrictOp.id, "AFFILIATED_WITH"),
        getOrCreateRelationship(facilityOp.id, scheduleOp.id, "FOLLOWS_SCHEDULE"),
    ];
    return [facilityOp, ...attributes, locationOp, ownerOp, licenseOp, schoolDistrictOp, scheduleOp, ...relationships];
}
//# sourceMappingURL=facility.js.map