import { getAuth } from 'firebase/auth';
import { EAS_BUILD_PROFILE } from '@env';


let API_URL: string;
switch(EAS_BUILD_PROFILE) {
    // case 'production':
    //     API_URL = E3_API_URL;
    //     break;
    // case 'preview':
    //     API_URL = E2_API_URL;
    //     break;
    case 'development':
    default:
        API_URL = 'http://127.0.0.1:8080/api';
        break;
};


/**
 * Generic request 
 * @param path 
 * @param method 
 * @param body 
 * @param authenticated
 * @return request data
 */
export const generalRequest = async (
    path: string,
    method: string,
    body: object | null = null,
    authenticated: boolean = true
) => {

    // Get bearer token if authenticated
    let bearerToken: string | null = null;
    if (authenticated) {
        const token = await getAuth().currentUser!.getIdToken(true);
        bearerToken = token;
    };

    // Create request
    const request = {
        method: method,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            ...bearerToken && { 'Authorization': bearerToken },
        },
        ...body && { body: JSON.stringify(body) }
    };
    
    // Execute request
    const response = await fetch(API_URL + path, request);
    if (!response.ok) { throw new Error(response.statusText) };

    const data = await response.json();
    return data;
};
