import React, { useState } from "react";
import MapGL, { NavigationControl, ScaleControl, Popup } from "react-map-gl";
import { Pins } from "components/Pins";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Offer } from "pages/offers";
import { OfferPopupInfo } from "components/OfferPopupInfo";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGFmcnkiLCJhIjoiY2tiZjN5YXprMHMydjJ4bTJ6Nmc0Nm05cCJ9.tjK7bVJ2b60K7UAnLSc3dg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navStyle: {
      position: "absolute",
      top: 5,
      left: 0,
      padding: "10px",
    },
    scaleControlStyle: {
      position: "absolute",
      bottom: 36,
      left: 0,
      padding: "10px",
    },
  })
);

interface Viewport {
  height: number;
  latitude: number;
  longitude: number;
  width: number;
  zoom: number;
}

interface MapProps {
  mapRef: React.Ref<HTMLDivElement>;
  offers: Offer[];
}

const Map: React.FC<MapProps> = ({ mapRef, offers }) => {
  const [viewport, setViewport] = useState({
    latitude: 50.061726,
    longitude: 19.947243,
    zoom: 11,
    minZoom: 6,
  });
  const [popupInfo, setPopupInfo] = useState<Offer | null>(null);
  const classes = useStyles();

  const handleViewportChange = (viewport: Viewport) => {
    setViewport((old) => ({ ...old, ...viewport }));
  };

  const onClickMarker = (offer) => {
    setPopupInfo(offer);
  };

  const renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <OfferPopupInfo offer={popupInfo} />
        </Popup>
      )
    );
  };

  return (
    <Paper style={{ height: "100%", width: "100%" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={(viewport: Viewport) =>
          handleViewportChange(viewport)
        }
        height="800px"
        width="719px"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        style={{
          shadowBox:
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Pins offers={offers} onClick={onClickMarker} />

        {renderPopup()}

        <div className={classes.navStyle}>
          <NavigationControl />
        </div>
        <div className={classes.scaleControlStyle}>
          <ScaleControl />
        </div>
      </MapGL>
    </Paper>
  );
};

export { Map };
