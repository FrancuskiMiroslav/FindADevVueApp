let timer;

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },

    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },

    async auth(context, payload){
        const apiKey = import.meta.env.VITE_API_KEY
        const mode = payload.mode;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

        if(mode === 'signup') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok) {
            const error = new Error(responseData.message || 'Login invalid, failed to authenticate. Please check your login data')
            throw error;
        };

        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogoutRedirect');
        }, expiresIn);

        console.log(responseData)
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },

    checkLocalStorageToAutoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 0) {
            return;
        }
        
        timer = setTimeout(() => {
            context.dispatch('autoLogoutRedirect');
        }, expiresIn);

        if(token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId
            })
        }
    },

    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration')

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        }) // since this is action we only reset our mutation
    },

    autoLogoutRedirect(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};