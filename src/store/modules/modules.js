import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            lastFetch: null,
            devs: [
                {
                  id: 'c1',
                  firstName: 'Jane',
                  lastName: 'Doe',
                  areas: ['backend'],
                  description:
                    'I am Jane and as a backend developer i work in a big tech company. Looking for a fully remote position.',
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'John',
                  lastName: 'Marston',
                  areas: ['frontend', 'backend', 'fullstack'],
                  description:
                    'I am John and as a senior fullstack developer i work in a big tech company. Looking for a fully remote position.',
                  hourlyRate: 30
                }
              ],
          requests: [],
        }
    },
    mutations,
    actions,
    getters
}