import {createSlice} from '@reduxjs/toolkit';

const reduxSessionSlice = createSlice({
    name: 'session',
    initialState: {
        employees: [],
        attributes: [],
        pageSize: 2,
        totalPages: 0,
        currentPage: 0,


    },
    reducers: {
        statetest: (state) => {
            state.employees = [];
            state.attributes = [];
            state.pageSize = 2;
            state.links = {};
            state.totalPages = 0;
            state.currentPage = 0;
        },

    },
});

export const {statetest} = reduxSessionSlice.actions;
export default reduxSessionSlice.reducer;
