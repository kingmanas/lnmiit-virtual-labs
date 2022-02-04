import axios from "axios";

const baseURL = "http://localhost:8001/api";
const axiosConfig = {
  method: "get",
  withCredentials: true,
};

export async function getProblemStatement(lab_id, problem_id) {
  const res = await axios({
    ...axiosConfig,
    url: `${baseURL}/lab/${lab_id}/problem/${problem_id}`,
  });
  return res.data;
}

export async function syncCode(code) {
  const res = await axios({
    ...axiosConfig,
    url: `${baseURL}/api/`,
    method: "post",
    data: {
      code: code,
    },
  });
  return res.data.code;
}

export async function submitCode(config, code) {}

// submission utilities
export function getSubmissionData(submission_id) {}
export function getProblemSubmissions(lab_id, problem_id) {}
