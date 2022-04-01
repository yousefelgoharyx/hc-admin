import { baseURL } from "./axios";

const resolveImage = (link) => {
  return baseURL + "/" + link;
};

export default resolveImage;
