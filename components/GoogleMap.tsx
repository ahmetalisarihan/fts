"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function GoogleMap() {
    const position = { lat: 36.6464946, lng: 29.1805653 };
    const handleClick = () => {
        window.open('https://www.google.com/maps/place/Fetes+End%C3%BCstriyel+Yap%C4%B1+Malzemeleri/@36.6463653,29.1812408,21z/data=!4m14!1m7!3m6!1s0x14c045b36ce002f5:0x62510c5f96e3b3ca!2sFetes+End%C3%BCstriyel+Yap%C4%B1+Malzemeleri!8m2!3d36.6463796!4d29.1813925!16s%2Fg%2F11ldhj5tjj!3m5!1s0x14c045b36ce002f5:0x62510c5f96e3b3ca!8m2!3d36.6463796!4d29.1813925!16s%2Fg%2F11ldhj5tjj?entry=ttu'
    )}


    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""; // Ensure apiKey is defined and has a value

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{ height: "280px", width: "280px" }}>
                <Map zoom={14} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
                    <AdvancedMarker position={position} onClick={handleClick}>
                        <Pin
                            background={"red"}
                            borderColor={"black"}
                            glyphColor={"black"}
                        />
                    </AdvancedMarker>

                </Map>
            </div>
        </APIProvider>
    );
}
