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
    },

    async loadDevsFromServer(context, payload) {
        const response = await fetch(`https://findadevvueapp-bce25-default-rtdb.europe-west1.firebasedatabase.app/devs.json`);

        const data = await response.json();

        if(!response.ok) {
            const error = new Error(response.message || 'Failed to fetch data');
            throw error;
        }

        const devs = [];

        for(const key in data) {
            const dev = {
                id: key,
                firstName: data[key].firstName,
                lastName: data[key].lastName,
                description: data[key].description,
                hourlyRate: data[key].hourlyRate,
                areas: data[key].areas,
            };

            devs.push(dev);
        }

        context.commit('setDataFromServer', devs)
    }
};