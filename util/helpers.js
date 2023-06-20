import { Op } from "sequelize";

export const getQuery = (queries) => {
  const query = [];
  for (const key in queries) {
    if (queries[key] !== "") {
      if (queries[key] == true || queries[key] == false) {
        query.push({
          [key]: {
            [Op.eq]: queries[key],
          },
        });
      } else {
        query.push({
          [key]: {
            [Op.like]: `%${queries[key]}%`,
          },
        });
      }
    }
  }
  return query;
};
