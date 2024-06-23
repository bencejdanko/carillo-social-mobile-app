import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pb.car-rillo.com');

let status;
console.log(pb.health.check()
    .then((response) => {
        console.log('Server is up and running');
        status = true
    })
    .catch((error) => {
        console.log('Server is down');
        status = false
    })
);

pb.autoCancellation(true);

export { pb, status };

export const authHandler = {

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