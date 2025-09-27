import axiosInstance from "../api/axios"

export const useServices = () => {

    const signUp = (data) => {
        return axiosInstance.post('/signUp', data);
    }
    const signIn = (data) => {
        return axiosInstance.post('/signIn', data);
    }
    const getUserInfo = () => {
        return axiosInstance.get('/get-user-info');
    }
    const getAllAssignment = () => {
        return axiosInstance.get('/get-assigmnMent');
    }
    const refereshToken = () => {
        return axiosInstance.post('/refresh-token', {});
    }
    const handleCreateAssignMent = (data) => {
        return axiosInstance.post('/create-assignment', data);
    }
    return {
        signUp, signIn, refereshToken, handleCreateAssignMent,getUserInfo,getAllAssignment
    }
}