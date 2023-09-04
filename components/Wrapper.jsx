import React from "react";
import { Provider } from "react-redux";

const Wrapper = ({ children, className ,store}) => {
    return (
    
        <div
            className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto ${
                className || ""
            }`}
        >
            {children}
        </div>
      
    );
};

export default Wrapper;