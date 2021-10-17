import React, { useState, useEffect } from "react";
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

const useLocalStorage = (key, defaultValue = JSON.stringify([])) => {
    const [state, setState] = useState(() => {
        let value = JSON.parse(window.localStorage.getItem(key) || defaultValue);
        return value;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

const useAxios = url => {
    const key = url.indexOf("pokemon") === -1 ? 'playingCards' : 'pokemon';
    const [cards, setCards] = useLocalStorage(key)
    
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