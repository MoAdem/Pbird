// list to array
const ltoa = (list) => {
  return Object.keys(list).map((key, id) => {
    return list[key];
  });
};

const constants = {
  PBirdToken: "pbird_token",
};

export { ltoa, constants };
