import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../misc/firebase';
import { generalRequest } from './shared/request';


/** Create User */


export const createUser = async (user: any) => {  
    try {

        // Create user on server
        await createDatabaseUser(user);

        // Sign in user
        await login(user['email'], user['password']);

    } catch (error) {
        console.log(error);
    };
};


const createDatabaseUser = async (user: any) => {
    const response = await generalRequest(
        '/users', 
        'POST', 
        user, 
        false
    );
    return response;
};


/** Sign In */


export const login = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
};


/** Sign Out */


export const logout = async () => {
    await signOut(auth);
    return;
};