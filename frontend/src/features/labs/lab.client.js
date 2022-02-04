import axios from "axios";

const baseURL = "http://localhost:8001/api";

export const labPageCount = async () => {
  const res = await axios({
    url: `${baseURL}/lab/page_count`,
    method: "get",
    withCredentials: true,
  });
  return res;
};

export const fetchLabs = async (page_no) => {
  const res = await axios({
    url: `${baseURL}/lab/${page_no}`,
    method: "get",
    withCredentials: true,
  });
  return res;
};

export const fetchLabProblems = async (lab_id) => {
  const res = await axios({
    url: `${baseURL}/lab/${lab_id}/problems`,
    method: "get",
    withCredentials: true,
  });
  return res;
};

// get the name and the picture for a given username
export const userChip = async (username) => {
  const res = await axios({
    method: "get",
    withCredentials: true,
    url: "user/chip",
  });
};
