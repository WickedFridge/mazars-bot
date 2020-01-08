module.exports = {
    name: 'lms',
    endpoints: {
        lms: {
            path: '/lms',
            method: 'post',
            validateInput: true,
            skipsOnError: false,
        },
    },
    port: 8004,
    firebase: {
        apiKey: 'AIzaSyChQkS6xJwii102Xv_vWrAeN4Ixtv99ycA',
        authDomain: 'lms-mazars-dev-cw.firebaseapp.com',
        databaseURL: 'https://lms-mazars-dev-cw.firebaseio.com',
        projectId: 'lms-mazars-dev-cw',
        storageBucket: 'lms-mazars-dev-cw.appspot.com',
        messagingSenderId: '744706211358',
        appId: '1:744706211358:web:85c89b61d74cb9ac51b80f',
    },
};
