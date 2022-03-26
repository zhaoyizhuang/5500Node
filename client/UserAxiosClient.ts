import axios, { AxiosResponse } from 'axios';
import User from "../models/User"
axios.defaults.baseURL = 'https://zzy-assign4.herokuapp.com';

const findAllUsers = async () =>
    await axios.get('/users');

const findUserById = async (uid: string) => {
    return await axios.get(`/users/${uid}`);
}

const createUser = async (user: User) =>
    await axios.post('/users', user);

const updateUser = async (uid: string, user: User) =>
    await axios.put(`/users/${uid}`, user);

const deleteUser = async (uid: string) =>
    await axios.delete(`/users/${uid}`);