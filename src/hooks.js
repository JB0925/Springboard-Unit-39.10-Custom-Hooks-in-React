import React, { useState } from "react";

const useFlip = (defaulValue = true) => {
    const [value, setValue] = useState(defaulValue);
    const flipCard = () => {
        setValue(value => !value);
    };
    return [value, flipCard];
};

export default useFlip;