import React, { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import pokemon from "./pokemonList";

const formatPokeCard = data => {
    return {
        id: uuid(),
        front_default: data.sprites.front_default,
        back_default: data.sprites.back_default,
        name: data.name,
        stats: data.stats
    };
};

const formatPlayingCard = data => {
    return {
        id: uuid(),
        image: data.cards[0].image
    };
};

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
        const newCard = pokemon.indexOf(name) === -1 ? formatPlayingCard(response.data) : formatPokeCard(response.data);
        setCards(cards => [...cards, newCard]);
    }

    const removeCards = () => {
        setCards(cards => [])
    }
    return [cards, addCard, removeCards];
};


export {
    useFlip,
    useAxios
};