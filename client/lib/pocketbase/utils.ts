import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pb.car-rillo.com/');

console.log(pb.health.check()
    .then((response) => {
        console.log('Server is up and running');
    })
    .catch((error) => {
        console.log('Server is down');
    })
);

pb.autoCancellation(true);
export default pb;

export const handler = {
    authStore: pb.authStore,

    register: async (email: string, password: string, passwordConfirm: string) => {
        try {
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm
            });
        } catch (error) {
            console.log(JSON.stringify(error))
            return new Error(error.message);
        }
    },

    login: async (email: string, password: string) => {
        try {
            await pb.collection('users').authWithPassword(
                email,
                password
            );
        } catch (error) {
            console.log(JSON.stringify(error))
            if (error.response) {
                return new Error(error.response.message);
            }
            // if (error.data) {
            //     console.log('data', error.data)
            //     let errorMessage = '';
            //     for (let key in error.data) {
            //         if (error.data.hasOwnProperty(key) && error.data[key].message) {
            //             errorMessage += ',' + error.data[key].message;
            //         }
            //     }
            //     return errorMessage;
            // }
        }
    },

    logout: async () => {
        try {
            await pb.authStore.clear()
        } catch (error) {
            return new Error('Error logging out user');
        }
    }
}