import React, { useEffect } from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};
const center = {
    lat: 48.995441,
    lng: 31.390739,
};
export default function GPSLocation() {

    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });


    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className="w-full h-full">
<GoogleMap mapContainerStyle={mapContainerStyle} zoom={7} center={center} ></GoogleMap>
        </div>
    )
}
