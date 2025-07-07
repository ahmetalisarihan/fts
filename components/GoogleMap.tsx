"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

interface GoogleMapProps {
  height?: string;
  zoom?: number;
  className?: string;
}

export default function GoogleMap({ height = "h-64 min-h-[280px]", zoom = 15, className = "" }: GoogleMapProps) {
    const position = { lat: 36.6462017, lng: 29.1808406 };
    const mapUrl = 'https://www.google.com/maps/place/Fetes+End%C3%BCstriyel+Yap%C4%B1+Malzemeleri/@36.6461896,29.1806881,21z/data=!4m6!3m5!1s0x14c045b36ce002f5:0x62510c5f96e3b3ca!8m2!3d36.6462017!4d29.1808406!16s%2Fg%2F11ldhj5tjj?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D';
    
    const handleClick = () => {
        window.open(mapUrl, '_blank');
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    
    console.log('GoogleMap component rendered with:', {
        apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'NO API KEY',
        height,
        zoom,
        position
    });

    if (!apiKey) {
        // Fallback to iframe when API key is not available
        return (
            <div className={`w-full ${height} rounded-lg overflow-hidden ${className}`}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d781.6154724012!2d29.180358569577848!3d36.646200865900266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c045b36ce002f5%3A0x62510c5f96e3b3ca!2sFetes%20End%C3%BCstriyel%20Yap%C4%B1%20Malzemeleri!5e0!3m2!1str!2str!4v1701234567890!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full rounded-lg"
                    title="FTS Endüstriyel Yapı Malzemeleri Konum"
                />
            </div>
        );
    }

    try {
        return (
            <APIProvider apiKey={apiKey}>
                <div className={`w-full ${height} rounded-lg overflow-hidden ${className}`}>
                    <Map 
                        zoom={zoom} 
                        center={position} 
                        mapId={process.env.NEXT_PUBLIC_MAP_ID}
                        className="w-full h-full"
                    >
                        <AdvancedMarker position={position} onClick={handleClick}>
                            <Pin
                                background={"#3b82f6"}
                                borderColor={"#1e40af"}
                                glyphColor={"white"}
                            />
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>
        );
    } catch (error) {
        console.error('Google Maps API error:', error);
        // Fallback to iframe on API error
        return (
            <div className={`w-full ${height} rounded-lg overflow-hidden ${className}`}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d781.6154724012!2d29.180358569577848!3d36.646200865900266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c045b36ce002f5%3A0x62510c5f96e3b3ca!2sFetes%20End%C3%BCstriyel%20Yap%C4%B1%20Malzemeleri!5e0!3m2!1str!2str!4v1701234567890!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full rounded-lg"
                    title="FTS Endüstriyel Yapı Malzemeleri Konum"
                />
            </div>
        );
    }
}
