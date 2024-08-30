import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";

import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    })

    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);

    const results = useQuery(["search", requestParams], fetchSearch)
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                        animal: formData.get("animal") ?? "",
                        breed: formData.get("breed") ?? "",
                        location: formData.get("location") ?? "",
                    };
                    setRequestParams(obj)
                }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        name="location"
                        id="location"
                        placeholder="location" />
                </label>
                <label htmlFor="animal">Animal
                    <select
                        name="animal"
                        id="animal"
                        value={animal}
                        disabled={ANIMALS.length === 0}
                        onChange={(e) => setAnimal(e.target.value)}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">Breed</label>
                <select
                    name="breed"
                    disabled={breeds.length === 0}
                    id="breed"
                >
                    <option />
                    {breeds.map((breed) => (
                        <option key={breed}>{breed}</option>
                    ))}
                </select>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams;