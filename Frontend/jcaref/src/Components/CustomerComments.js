import React from "react";
import { HiUserCircle } from "react-icons/hi";

const comments = [
  {
    name: "Dr. Manuja",
    role: "Cardiologist",
    comment: "Jcare makes patient management so seamless and efficient. I can access records instantly, which saves a lot of time.",
  },
  {
    name: "Nurse Anjali",
    role: "Registered Nurse",
    comment: "Managing appointments and schedules has never been easier. The interface is intuitive and fast.",
  },
  {
    name: "Mr. Fernando",
    role: "Patient",
    comment: "Booking a slot was effortless, and I could see all my previous visits in one place. Highly recommended!",
  },
  {
    name: "Dr. Kularatne",
    role: "Surgeon",
    comment: "Real-time patient updates and digital records reduce errors significantly. Jcare is a game-changer.",
  },
];

const CustomerComments = () => {
  return (
    <section className="bg-gradient-to-r from-white to-purple-500 py-10 px-6 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
        What Our Users Say
      </h2>

      <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
        {comments.map((c, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-80 md:w-96 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center"
          >
            <div className="flex flex-col items-center mb-4">
              <HiUserCircle className="text-4xl text-purple-600 mb-2" />
              <h3 className="font-semibold text-black">{c.name}</h3>
              <p className="text-sm text-black/70">{c.role}</p>
            </div>
            <p className="text-black text-sm leading-relaxed">{c.comment}</p>
          </div>
        ))}
        {/* Spacer at the end so last card is fully visible */}
        <div className="flex-shrink-0 w-6"></div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  
          scrollbar-width: none;  
        }
      `}</style>
    </section>
  );
};

export default CustomerComments;