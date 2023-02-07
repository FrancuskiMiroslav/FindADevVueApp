export default {
    async addDev(context, formData) {
        const userId = context.rootGetters.userId;

        const devData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            description: formData.description,
            hourlyRate: formData.rate,
            areas: formData.areas,
        };

        const response = await fetch(`https://findadevvueapp-bce25-default-rtdb.europe-west1.firebasedatabase.app/devs/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(devData)
        });

        // const data = await response.json();

        if(!response.ok) {
            // error...
        }

        context.commit('addDev', {
            ...devData,
            id: userId
        });
    },

    contactDev(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            devId: payload.devId,
            userEmail: payload.email,
            message: payload.message,
        };

        context.commit('addRequest', newRequest)
    }
};