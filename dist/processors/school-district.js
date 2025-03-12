import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';
export function processSchoolDistrict(data) {
    const ops = [];
    // Create SchoolDistrict entity and attributes
    const schoolDistrictOp = getOrCreateEntity("SchoolDistrict", data);
    const attributes = getOrCreateAttributes("SchoolDistrict", data);
    // Create related entity
    const facilityOp = getOrCreateEntity("Facility", data);
    // Create relationship
    const relationship = getOrCreateRelationship(schoolDistrictOp.id, facilityOp.id, "OVERSEES");
    return [schoolDistrictOp, ...attributes, facilityOp, relationship];
}
//# sourceMappingURL=school-district.js.map