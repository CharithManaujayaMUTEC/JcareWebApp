import React from 'react';
import { HiBookOpen, HiUserGroup, HiUsers, HiDesktopComputer } from "react-icons/hi";

const icons = [HiBookOpen, HiUserGroup, HiUsers, HiDesktopComputer];

const BackgroundPattern = ({ count = 20 }) => {
  // Generate array of positions and styles
  const items = Array.from({ length: count }).map(() => ({
    Icon: icons[Math.floor(Math.random() * icons.length)],
    top: Math.random() * 100, // percentage
    left: Math.random() * 100, // percentage
    size: Math.random() * 40 + 20, // 20px to 60px
    opacity: Math.random() * 0.15 + 0.05, // 0.05 to 0.2
    duration: Math.random() * 10 + 5, // animation duration in seconds
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {items.map((item, index) => {
        const { Icon, top, left, size, opacity, duration } = item;
        return (
          <Icon
            key={index}
            className="text-purple-900"
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              fontSize: `${size}px`,
              opacity: opacity,
              animation: `float ${duration}s ease-in-out infinite alternate`,
            }}
          />
        );
      })}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(-5deg); }
          }
        `}
      </style>
    </div>
  );
};

export default BackgroundPattern;