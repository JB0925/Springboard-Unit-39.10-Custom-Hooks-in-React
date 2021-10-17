import React, { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import pokemon from "./pokemonList";

const useFlip = (defaulValue = true) => {
    const [value, setValue] = useState(defaulValue);
    const flipCard = () => {
        setValue(value => !value);
    };
    return [value, flipCard];
};

const useAxios = url => {
    const [cards, setCards] = useState([]);
    const addCard = async(name) => {
        url = pokemon.indexOf(name) !== -1 ? `${url}${name}/` : url;
        const response = await axios.get(url);
        setCards(cards => [...cards, { ...response.data, id: uuid() }]);
    }
    return [cards, addCard];
};


export {
    useFlip,
    useAxios
};