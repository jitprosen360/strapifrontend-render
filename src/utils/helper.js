export const getDiscountedPricePercentage = (
    originalPrice,
    discountedPrice
) => {
    const discount = originalPrice - discountedPrice;

    const discountPercentage = (discount / originalPrice) * 100;

    return discountPercentage.toFixed(2);
};


import { STRAPI_API_TOKEN } from "../utils/urls";
    
    export const getToken = () => {
      return localStorage.getItem(STRAPI_API_TOKEN);
    };
    
    export const setToken = (token) => {
      if (token) {
        localStorage.setItem(STRAPI_API_TOKEN, token);
      }
    };
    
    export const removeToken = () => {
      localStorage.removeItem(STRAPI_API_TOKEN);
    };