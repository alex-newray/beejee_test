export const defaultState = {
    tasks: {
        records: [],
        page: 1,
        pages: 1,
        sortField: 'id',
        sortDirection: 'asc',
    },
    login: {
        open: false,
        username: '',
        password: '',
        message: {},
        loading: false,
        token:null,
        tokenExpired:null,
    },
    create: {
        open: false,
        loading: false,
        username: '',
        email: '',
        text: '',
        message: {},
    },
    update: {
        open: false,
        loading: false,
        task_id: null,
        status: null,
        text: null,
        message: {},
    },
    notification: {
        open: false,
        message: '',
    }
};