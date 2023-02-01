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
                    "I'm Miroslav and I am a self-taught web developer with a flair for creating elegant solutions in the least amount of time. I feel most comfortable when I am coding from scratch.",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Jane',
                  lastName: 'Doe',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    'I am Jane and as a senior developer in a big tech company. Looking for a fully remote position.',
                  hourlyRate: 30
                }
              ]
        }
    },
    mutations,
    actions,
    getters
}