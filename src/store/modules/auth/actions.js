export default {
    async login(context, payload) {
        const apiKey = 'AIzaSyCk-leJXZaAZZS4UFhwHXUzFY4sFGltzw8'
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
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

        console.log(responseData)
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },

    async signup(context, payload) {
        const apiKey = 'AIzaSyCk-leJXZaAZZS4UFhwHXUzFY4sFGltzw8'
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok) {
            const error = new Error(responseData.message || 'Signup invalid, failed to authenticate. Please check your login data')
            throw error;
        };

        console.log(responseData)
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
};