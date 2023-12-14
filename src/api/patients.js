// /src/api/patients.js
import axios from 'axios';

export const getPatients = () => {
  return axios.get('/api/patients');
};

export const createPatient = (patient) => {
  return axios.post('/api/patients', patient);
};

export const getPatient = (id) => {
  return axios.get(`/api/patients/${id}`);
};

export const updatePatient = (id, patient) => {
  return axios.put(`/api/patients/${id}`, patient);
};

export const deletePatient = (id) => {
  return axios.delete(`/api/patients/${id}`);
};