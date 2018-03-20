import Cookies from 'js-cookie';

const user = {
    state: {},
    mutations: {
        logout (state, vm) {
            Cookies.remove('userName');
            Cookies.remove('password');
            Cookies.remove('rememberPwd');
            Cookies.remove('shop_id');
            localStorage.clear();
        }
    }
};

export default user;
