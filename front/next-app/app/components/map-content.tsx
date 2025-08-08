'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

export const MapContent = () => {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <div style={{ width: '100%', height: '80vh' }}>
                <Map
                    defaultZoom={15}
                    defaultCenter={{ lat: 35.170915, lng: 136.881537 }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </APIProvider>
    );
};

