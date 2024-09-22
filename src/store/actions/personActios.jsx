/* eslint-disable no-unused-vars */
export { removePerson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadPerson } from "../reducers/personSlice";

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalId = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(
            `/person/${id}/combined_credits`
        );
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);

        let theultimatedetails = {
            detail: detail.data,
            externalId: externalId.data,
            combinedCredits: combinedCredits.data,
            movieCredits: movieCredits.data,
            tvCredits: tvCredits.data,
        };

        dispatch(loadPerson(theultimatedetails));
    } catch (error) {
        console.error("Error: ", error);
    }
};
