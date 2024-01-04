import Container from "@/components/container";
import Heading from "@/components/heading";
import MemoizedMapComponent from "@/components/map-component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.375rem",
};

const TrackUser = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const { id } = useParams();

  useEffect(() => {
    const socket = new WebSocket(
      "ws://3.109.183.75:7401/ws/trip-tracking/" + id
    );
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "data");
      if (data.type === "trip_notify_message") {
        setCoordinates({ lat: data.lat, lng: data.lng });
        console.log(coordinates, "coordinates");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Container>
      <Heading>Live Tracking</Heading>
      <MemoizedMapComponent
        center={coordinates}
        containerStyle={containerStyle}
        coordinates={coordinates}
      />
    </Container>
  );
};

export default TrackUser;
