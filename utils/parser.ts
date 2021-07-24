import get  from "lodash/get";

export function parseTSTypeReference(typeName) {
  const type = get(typeName, "type");
  switch (type) {
    case "TSQualifiedName":
      return `${get(typeName, "left.name")}.${get(typeName, "right.name")}`;
    case "Identifier":
      // 两种情况，比如CSSProperties，CustomProps就需要区分对待
      // TODO 需要判断框架属性 比如React的CSSProperties
      return `[${get(typeName, "name")}](###${get(typeName, "name")})`;
    default:
      return `Unknown ReferenceType`;
  }
}

export function parseTSFunctionType(parameters, typeAnnotation) {
  const parseTSFunctionParameters = (parameters) => {
    if (!parameters || !parameters.length) {
      return `()`;
    }
    let args = parameters.map((parameter) => {
      return `${get(parameter, "name")}: ${parseTypeAnnotation(
        get(parameter, "typeAnnotation.typeAnnotation")
      )}`;
    });
    return "(" + args.join(", ") + ")";
  };
  const parseTSFunctionReturn = (typeAnnotation) => {
    const type = get(typeAnnotation, "type");
    switch (type) {
      case "TSVoidKeyword":
        return "void";
      case "TSTypeReference":
        return parseTSTypeReference(get(typeAnnotation, "typeName"));
      default:
        return `Unknown FunctionType`;
    }
  };
  return `${parseTSFunctionParameters(parameters)} => ${parseTSFunctionReturn(
    typeAnnotation
  )}`;
}

export function parseTSTypeLiteral(members) {
  const ret = parseInterfaceDefinitions(members);
  let args = ret.map((t) => `${t.name}: ${t.type}`);
  return "{ " + args.join(", ") + " }";
}

export function parseTypeAnnotation(typeAnnotation) {
  const type = get(typeAnnotation, "type");
  switch (type) {
    case "TSNumberKeyword":
    case "TSStringKeyword":
    case "TSBooleanKeyword":
    case "TSNullKeyword":
    case "TSUndefinedKeyword":
    case "TSSymbolKeyword":
    case "TSAnyKeyword":
      return type.match(/TS(\w+)Keyword/)[1].toLowerCase();
    case "TSUnionType":
      return get(typeAnnotation, "types", [])
        .map((type) => get(type, "literal.value"))
        .join(" \\| ");
    case "TSFunctionType":
      return parseTSFunctionType(
        get(typeAnnotation, "parameters"),
        get(typeAnnotation, "typeAnnotation.typeAnnotation")
      );
    case "TSTypeReference":
      return parseTSTypeReference(get(typeAnnotation, "typeName"));
    case "TSTypeLiteral":
      return parseTSTypeLiteral(get(typeAnnotation, "members"));
    default:
      return "UnKnownType";
  }
}
export function parseCommentBlock(rawComments: string, tag?: string) {
  const comments = rawComments
    .trim()
    .split(/\r\n/)
    .map((str) => str.trim().replace(/^\*/g, "").trim())
    .filter(Boolean);

  if (!tag) return comments[0]; // 第一个应该是description

  const findStr = comments.find((str) => str.includes(`@${tag}`)) || "";
  const searchResult = findStr.match(/(@`${tag}`)?\s+([\w\W]*)/);
  return searchResult?.length === 3 ? searchResult[2] : "";
}

export function parseInterfaceDefinitions(nodePaths) {
  const parseInterfaceDefinitionsNode = (nodePath) => {
    const name = get(nodePath, "key.name");
    const hasComments = !!get(nodePath, "leadingComments");
    const comments = (hasComments ? get(nodePath, "leadingComments.0.value", "") : '')
      .trim()
      .split(/[\r\n]/)
      .map((str) => str.trim().replace(/^\*/g, "").trim())
      .filter(Boolean);
    const typeAnnotation = get(nodePath, "typeAnnotation.typeAnnotation");
    const type = parseTypeAnnotation(typeAnnotation);
    return { name, type, comments };
  };
  return nodePaths.map(parseInterfaceDefinitionsNode);
}
