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

    async contactDev(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message,
        };

        const response = await fetch(`https://findadevvueapp-bce25-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.devId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const data = response.json();

        if(!response.ok) {
            const error = new Error(response.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = data.name;
        newRequest.devId = payload.devId;

        context.commit('addRequest', newRequest);
    },

    async fetchRquestsFromServer(context) {
        const devId = context.rootGetters.userId;
        const response = await fetch(`https://findadevvueapp-bce25-default-rtdb.europe-west1.firebasedatabase.app/requests/${devId}.json`);

        const data = await response.json();

        if(!response.ok) {
            const error = new Error(response.message || 'Failed to fetch requests from server.');
            throw error
        }

        const requests = [];

        for (const key in data) {
            const request = {
                id: key,
                devId: devId,
                userEmail: data[key].userEmail,
                message: data[key].message
            };

            requests.push(request);
        }

        

        context.commit('setRequests', requests)
    },

    async loadDevsFromServer(context, payload) {
        if(!payload.forceRefresh && !context.getters.checkUpdateDataFromServer) {
            return;
        }

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

        context.commit('setDataFromServer', devs);
        context.commit('setFetchTimestamp');
    }
};