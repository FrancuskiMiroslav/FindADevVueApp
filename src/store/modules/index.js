import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            mockData: [
                {
                  id: 'c1',
                  firstName: 'Miroslav',
                  lastName: 'Francuski',
                  areas: ['frontend', 'career'],
                  description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Jane',
                  lastName: 'Doe',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 30
                }
              ]
        }
    },
    mutations,
    actions,
    getters
}