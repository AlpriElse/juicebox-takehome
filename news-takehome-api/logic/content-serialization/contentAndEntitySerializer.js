function contentAndEntitySerializer(content, namedEntities) {
  console.log(content, namedEntities);
  const result = [];

  const allEntities = [];
  const entityTypeLookupTable = new Map();
  for (const [type, entities] of Object.entries(namedEntities)) {
    for (const entity of entities) {
      allEntities.push(entity);
      entityTypeLookupTable.set(entity, type);
    }
  }

  let remainingSentence = content;

  while (remainingSentence !== null && remainingSentence.length > 0) {
    let smallestIdx = remainingSentence.length;
    let earliestEntity = null;

    for (const entity of allEntities) {
      const currEntityIdx = remainingSentence.indexOf(entity);

      if (currEntityIdx != -1 && currEntityIdx < smallestIdx) {
        smallestIdx = currEntityIdx;
        earliestEntity = entity;
      }
    }

    if (smallestIdx === remainingSentence.length) {
      result.push({
        content: remainingSentence,
        type: "none",
      });
      remainingSentence = "";
    } else if (smallestIdx === 0) {
      result.push({
        content: earliestEntity,
        type: entityTypeLookupTable.get(earliestEntity),
      });
      remainingSentence = remainingSentence.substring(
        earliestEntity.length,
        remainingSentence.length
      );
    } else {
      const splitSentence = remainingSentence.split(earliestEntity);

      result.push({
        content: splitSentence[0],
        type: "none",
      });
      result.push({
        content: earliestEntity,
        type: entityTypeLookupTable.get(earliestEntity),
      });

      remainingSentence = remainingSentence.substring(
        splitSentence[0].length + earliestEntity.length,
        remainingSentence.length
      );
    }
  }

  return result;
}

module.exports = contentAndEntitySerializer;
