function extractField(field) {
    switch (field.kind) {
        case 'stringValue':
            return field.stringValue;
        case 'numberValue':
            return field.numberValue;
        case 'nullValue':
            return null;
        case 'boolValue':
            return field.boolValue;
        case 'structValue':
            const struct = {};
            const fieldNames = Object.keys(field.structValue.fields);
            fieldNames.forEach((fieldName) => {
                const _field = field.structValue.fields[fieldName];
                const simplifiedField = extractField(_field);
                struct[fieldName] = simplifiedField;
            });
            return struct;
        case 'listValue':
            return field.listValue.values.map(extractField);
        default:
            return null;
    }
}

function simplifyEntities(rawEntities) {
    const entities = {};
    if (rawEntities && rawEntities.fields) {
        const fieldNames = Object.keys(rawEntities.fields);
        fieldNames.forEach((fieldName) => {
            const field = rawEntities.fields[fieldName];
            const simplifiedField = extractField(field);
            const isEmptyArray = Array.isArray(simplifiedField) && simplifiedField.length === 0;
            const isEmptyString = simplifiedField === '';
            if (!isEmptyString && !isEmptyArray) {
                entities[fieldName] = simplifiedField;
            }
        });
    }
    return entities;
}

module.exports = {
    simplifyEntities,
};
