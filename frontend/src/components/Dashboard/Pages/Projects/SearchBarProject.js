import React, { useEffect } from 'react'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

export default function SearchBarProject({ id, setLocation, Locations, setLocationText, defaultValue }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 50.450001, lng: () => 30.523333 },
            radius: 100 * 1000,
        },
    });

    useEffect(() => {
        setValue(defaultValue, false)
        clearSuggestions();
    }, [])


    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        setLocationText(address)

        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const findedIndex = Locations.findIndex(location => location.id === id)
            Locations[findedIndex].arr = [lat, lng]
            console.log(Locations);
            setLocation(Locations)
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="w-full relative">
            <Combobox className="w-full" onSelect={handleSelect}>
                <ComboboxInput
                    className={"w-full h-8 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450"}
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Mісце розташування на Google Maps"
                />
                <div className="absolute bg-gray-200 w-full z-50">
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </div>
            </Combobox>
        </div>
    );
}
