import React from "react";
import GoogleMapReact from 'google-map-react';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap({ lat, lng }) {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 5
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA8htfq3Wn0MU2wFThF9LcVA8AmlxUL__4" }}
                defaultCenter={{ lat, lng }}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={lat}
                    lng={lng}
                    text="🤗"
                />
            </GoogleMapReact>
        </div>
    );
}