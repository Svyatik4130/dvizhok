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
import "@reach/combobox/styles.css";
import mapStyles from "./MapStyles";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const mapContainerStyle = {
    height: "100%",
    width: "100%",
};
const center = {
    lat: 48.995441,
    lng: 31.390739,
};

export default function GPSLocation() {
    const allProjects = useSelector(state => state.allProjects)

    const history = useHistory()

    const [curPosition, setCurPosition] = React.useState();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            }, () => null
        );
    }, [])
    const [selected, setSelected] = React.useState(null);

    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const CheckAndShowProjectsAtThisLocation = (id, lat, lng) => {
        const OtherProjectsAtThisCoords = allProjects.filter((project) => {
            return project._id !== id && project.location.find(location => location.arr[0] == lat && location.arr[1] == lng)
        })

        if (OtherProjectsAtThisCoords) {
            return (
                OtherProjectsAtThisCoords.map((project) => {
                    return (
                        <>
                            <div key={project._id} className="flex mt-3 p-2 rounded-xl">
                                <div className="flex items-center min-w-0 max-w-md">
                                    <div className="w-7 h-7 flex-shrink-0 rounded-xl relative responsive-image-bgImgUrl" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}>
                                    </div>
                                    <div className="ml-2 truncate">
                                        <a>{project.projectName}</a>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { history.push(`/dashboard/projects/${project._id}`) }} className="rounded-lg w-full py-1 px-1 text-center hover:bg-yellow-300 bg-yellow-350 ">Перейти на стрінцу проекту</button>
                        </>
                    )
                })
            )
        }
    }


    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    console.log(allProjects)
    return (
        <div className="w-full relative h-full">

            <Locate panTo={panTo} />
            <Search panTo={panTo} />

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={7}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {allProjects.map((project) => {
                    if (project?.isWholeUkraine) {
                        return (
                            <Marker
                                key={`${project?._id}`}
                                position={{ lat: Number(50.4501), lng: Number(30.5234) }}
                                onClick={() => {
                                    setSelected({ project, location: [50.4501, 30.5234] });
                                }}
                                icon={{
                                    url: `/marker_img.svg`,
                                    origin: new window.google.maps.Point(0, 0),
                                    scaledSize: new window.google.maps.Size(30, 30),
                                }}
                            />
                        )
                    } else {
                        return (project.location.map(locInfo => {
                            return (<Marker
                                key={`${project?._id}`}
                                position={{ lat: Number(locInfo?.arr?.[0]), lng: Number(locInfo?.arr?.[1]) }}
                                onClick={() => {
                                    setSelected({ project, location: [locInfo?.arr?.[0], locInfo?.arr?.[1]] });
                                }}
                                icon={{
                                    url: `/marker_img.svg`,
                                    origin: new window.google.maps.Point(0, 0),
                                    scaledSize: new window.google.maps.Size(30, 30),
                                }}
                            />
                            )
                        }))
                    }
                })}

                {selected ? (
                    <InfoWindow
                        position={{ lat: Number(selected.location[0]), lng: Number(selected.location[1]) }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div className="max-w-4xl max-h-192 overflow-y-scroll">
                            <div key={selected.project._id} className="flex mt-3 p-2 rounded-xl">
                                <div className="flex items-center min-w-0 max-w-md">
                                    <div className="w-7 h-7 flex-shrink-0 rounded-xl relative responsive-image-bgImgUrl" style={{ backgroundImage: `url(${selected.project.logoUrl[0]})` }}>
                                    </div>
                                    <div className="ml-2 truncate">
                                        <a>{selected.project.projectName}</a>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { history.push(`/dashboard/projects/${selected.project._id}`) }} className="rounded-lg w-full py-1 px-1 text-center hover:bg-yellow-300 bg-yellow-350 ">Перейти на сторінку проекту</button>
                            {CheckAndShowProjectsAtThisLocation(selected.project._id, selected.location[0], selected.location[1])}
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )

    function Locate({ panTo }) {
        return (
            <button
                className=" rounded-2xl p-2 bg-white bg-opacity-90 hover:bg-opacity-50 transition-all absolute top-4 right-4 z-10"
                onClick={() => {
                    if (curPosition) panTo(curPosition)
                }}
            >
                <img src="/cur_loc.svg" className=" w-9" alt="compass" />
            </button>
        );
    }

    function Search({ panTo }) {
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
            clearSuggestions();

            try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                panTo({ lat, lng });
            } catch (error) {
                console.log("😱 Error: ", error);
            }
        };

        return (
            <div className="absolute top-5 lg:left-4 left-2 shadow-2xl lg:w-full w-8/12 max-w-md z-10">
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        className={" p-2 text-lg outline-none w-full rounded-lg"}
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Пошук на Google Maps"
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
}