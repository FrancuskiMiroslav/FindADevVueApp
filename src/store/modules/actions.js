export default {
    addDev(context, formData) {
        const devData = {
            id: context.rootGetters.userId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            description: formData.description,
            hourlyRate: formData.rate,
            areas: formData.areas,
        };

        context.commit('addDev', devData);
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