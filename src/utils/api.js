import { API_URL, STRAPI_API_TOKEN } from "./../utils/urls"


export const fetchDataFromApi = async (endpoint) => {
    const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + STRAPI_API_TOKEN
        }
      };
      
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    return data;
}
export const makePaymentRequest = async (endpoint, payload, token) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
};
// export const makePaymentRequest = async (endpoint, payload) => {
//     try {
//         const res = await fetch(`${API_URL}${endpoint}`, {
//             method: "POST",
//             headers: {
//                 Authorization: "Bearer " + STRAPI_API_TOKEN,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//             const errorResponse = await res.json();
//             throw new Error(`Payment request failed: ${errorResponse.message}`);
//         }

//         // Construct the response with the stripeSession property
//         const stripeSession = await res.json();
//         return { stripeSession };
//     } catch (error) {
//         throw new Error(`Payment request failed: ${error.message}`);
//     }
// };
