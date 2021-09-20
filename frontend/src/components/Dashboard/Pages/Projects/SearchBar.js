import React from 'react'
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

export default function Search({ setLocation, setLocationText }) {
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
            setLocation([lat, lng])
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="w-full">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    className={"w-full h-8 mt-4 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450"}
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Mісце розташування проекту на Google Maps"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
