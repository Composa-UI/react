/*
  Paste this script into the Figma use_figma tool.

  Purpose:
  Export UI3 variables in deterministic chunks without truncating tool output.

  Usage:
  1. Set collectionName to "Colors", "Sizing", or "Typography".
  2. Set start and limit. Use 25 for Colors unless the tool response budget changes.
  3. Run against file 4kilp0ShQiYsoUPJdleqEH with skillNames "figma-use".
  4. Save each result locally if you need raw provenance. Raw chunks are not tracked in the repo; resolved tokens live in design/generated/composa-core-tokens.css and design/tokens.css.
*/

const collectionName = "Colors";
const start = 0;
const limit = 25;

function normalizeRaw(value) {
  if (value && typeof value === "object" && value.type === "VARIABLE_ALIAS") {
    return { alias: value.id };
  }
  if (value && typeof value === "object" && typeof value.r === "number" && typeof value.g === "number" && typeof value.b === "number") {
    return {
      r: Math.round(value.r * 10000) / 10000,
      g: Math.round(value.g * 10000) / 10000,
      b: Math.round(value.b * 10000) / 10000,
      a: value.a === undefined ? 1 : Math.round(value.a * 10000) / 10000,
    };
  }
  return value;
}

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const collection = collections.find((item) => item.name === collectionName);
if (!collection) throw new Error(`Missing collection ${collectionName}`);

const ids = collection.variableIds.slice(start, start + limit);
const variables = [];

for (const id of ids) {
  const variable = await figma.variables.getVariableByIdAsync(id);
  if (!variable) continue;
  const valuesByMode = {};
  for (const mode of collection.modes) {
    valuesByMode[mode.name] = normalizeRaw(variable.valuesByMode[mode.modeId]);
  }
  variables.push({
    id: variable.id,
    name: variable.name,
    type: variable.resolvedType,
    scopes: variable.scopes,
    hiddenFromPublishing: variable.hiddenFromPublishing,
    codeSyntax: variable.codeSyntax || {},
    valuesByMode,
  });
}

return {
  source: {
    library: "UI3: Figma's UI Kit (Community)",
    fileKey: "4kilp0ShQiYsoUPJdleqEH",
    collection: collection.name,
    collectionId: collection.id,
  },
  chunk: {
    start,
    limit,
    count: variables.length,
    total: collection.variableIds.length,
    nextStart: start + variables.length,
  },
  modes: collection.modes.map((mode) => mode.name),
  variables,
};
