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
    }
};