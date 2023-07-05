import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )}
          <h4 className="w-full text-center text-[25px] pb-[100px] pt-[100px]">
            {allEvents?.length === 0 && "Chưa có sự kiện nào!"}
          </h4>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default EventsPage;
