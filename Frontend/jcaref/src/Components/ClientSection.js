import React, { useEffect, useRef } from "react";

const clients = [
  {
    name: "City Hospital",
    industry: "Healthcare",
    description: "Seamless patient management and appointment scheduling.",
    image: "/Images/hospital.jpg",
  },
  {
    name: "Sunrise Clinic",
    industry: "Healthcare",
    description: "Efficient digital records and real-time patient monitoring.",
    image: "/Images/hospital.jpg",
  },
  {
    name: "Wellness Center",
    industry: "Healthcare",
    description: "Streamlined workflow for doctors and staff alike.",
    image: "/Images/hospital.jpg",
  },
  {
    name: "Metro Health",
    industry: "Healthcare",
    description: "Enhancing hospital operations with integrated digital solutions.",
    image: "/Images/hospital.jpg",
  },
];

const ClientSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 1; // pixels per interval
    const interval = 20; // ms

    const scrollInterval = setInterval(() => {
      if (container) {
        scrollAmount += scrollStep;
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0; // loop back
        }
        container.scrollLeft = scrollAmount;
      }
    }, interval);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-white to-purple-500 py-10 px-6 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
        Our Valued Clients
      </h2>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-hidden"
      >
        {/* Duplicate array for seamless looping */}
        {clients.concat(clients).map((client, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex-shrink-0 w-64 md:w-72 flex flex-col items-center text-center"
          >
            {/* Image top */}
            <div className="w-full h-48 md:h-56 bg-gray-100 flex items-center justify-center p-4">
              <img
                src={client.image}
                alt={client.name}
                className="object-contain h-full w-full"
              />
            </div>
            {/* Text below */}
            <div className="w-full p-4 flex flex-col items-center justify-center space-y-2">
              <h3 className="font-semibold text-black">{client.name}</h3>
              <p className="text-black/70 text-sm">{client.industry}</p>
              <p className="text-black text-sm">{client.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientSection;
