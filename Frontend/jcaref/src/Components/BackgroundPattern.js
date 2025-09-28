import React from "react";

const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Static hexagonal pattern */}
      <div className="absolute inset-0 opacity-25">
        <div className="hexagon-pattern absolute inset-0"></div>
      </div>

      {/* Random ripples */}
      <div className="absolute inset-0">
        <div className="ripple ripple-1"></div>
        <div className="ripple ripple-2"></div>
        <div className="ripple ripple-3"></div>
        <div className="ripple ripple-4"></div>
        <div className="ripple ripple-5"></div>
        <div className="ripple ripple-6"></div>
        <div className="ripple ripple-7"></div>
        <div className="ripple ripple-8"></div>
      </div>

      <style jsx>{`
        .hexagon-pattern {
          background-image: 
            linear-gradient(30deg, rgba(147,51,234,0.15) 12%, transparent 12.5%, transparent 87%, rgba(147,51,234,0.15) 87.5%, rgba(147,51,234,0.15)),
            linear-gradient(150deg, rgba(147,51,234,0.15) 12%, transparent 12.5%, transparent 87%, rgba(147,51,234,0.15) 87.5%, rgba(147,51,234,0.15)),
            linear-gradient(30deg, rgba(147,51,234,0.15) 12%, transparent 12.5%, transparent 87%, rgba(147,51,234,0.15) 87.5%, rgba(147,51,234,0.15)),
            linear-gradient(150deg, rgba(147,51,234,0.15) 12%, transparent 12.5%, transparent 87%, rgba(147,51,234,0.15) 87.5%, rgba(147,51,234,0.15)),
            linear-gradient(60deg, rgba(168,85,247,0.08) 25%, transparent 25.5%, transparent 75%, rgba(168,85,247,0.08) 75%, rgba(168,85,247,0.08)), 
            linear-gradient(60deg, rgba(168,85,247,0.08) 25%, transparent 25.5%, transparent 75%, rgba(168,85,247,0.08) 75%, rgba(168,85,247,0.08));
          background-size: 100px 173px;
          background-position: 0 0, 0 0, 50px 86.5px, 50px 86.5px, 0 0, 50px 86.5px;
        }

        .ripple {
          position: absolute;
          border: 2px solid rgba(147,51,234,0.4);
          border-radius: 50%;
          animation: ripple-expand 6s ease-out infinite;
        }

        .ripple-1 {
          width: 60px;
          height: 60px;
          top: 15%;
          left: 20%;
          animation-delay: 0s;
        }

        .ripple-2 {
          width: 80px;
          height: 80px;
          top: 35%;
          right: 25%;
          animation-delay: -1.5s;
        }

        .ripple-3 {
          width: 50px;
          height: 50px;
          top: 60%;
          left: 15%;
          animation-delay: -3s;
        }

        .ripple-4 {
          width: 70px;
          height: 70px;
          top: 25%;
          left: 65%;
          animation-delay: -4.5s;
        }

        .ripple-5 {
          width: 90px;
          height: 90px;
          bottom: 25%;
          right: 20%;
          animation-delay: -2s;
        }

        .ripple-6 {
          width: 40px;
          height: 40px;
          bottom: 35%;
          left: 45%;
          animation-delay: -5s;
        }

        .ripple-7 {
          width: 75px;
          height: 75px;
          top: 70%;
          right: 40%;
          animation-delay: -0.5s;
        }

        .ripple-8 {
          width: 55px;
          height: 55px;
          top: 45%;
          left: 40%;
          animation-delay: -3.5s;
        }

        @keyframes ripple-expand {
          0% {
            transform: scale(0.3);
            opacity: 0.8;
            border-color: rgba(147,51,234,0.6);
          }
          50% {
            transform: scale(1.5);
            opacity: 0.4;
            border-color: rgba(168,85,247,0.4);
          }
          100% {
            transform: scale(3);
            opacity: 0;
            border-color: rgba(147,51,234,0);
          }
        }

        /* Additional subtle background layers for depth */
        .hexagon-pattern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(30deg, rgba(168,85,247,0.05) 12%, transparent 12.5%, transparent 87%, rgba(168,85,247,0.05) 87.5%),
            linear-gradient(150deg, rgba(168,85,247,0.05) 12%, transparent 12.5%, transparent 87%, rgba(168,85,247,0.05) 87.5%);
          background-size: 150px 260px;
          background-position: 25px 43px, 25px 43px;
        }

        .hexagon-pattern::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(60deg, rgba(126,34,206,0.03) 25%, transparent 25.5%, transparent 75%, rgba(126,34,206,0.03) 75%);
          background-size: 200px 346px;
          background-position: 50px 87px;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .hexagon-pattern {
            background-size: 80px 138px;
            background-position: 0 0, 0 0, 40px 69px, 40px 69px, 0 0, 40px 69px;
          }

          .ripple {
            animation-duration: 5s;
          }
        }

        @media (max-width: 768px) {
          .hexagon-pattern {
            background-size: 70px 121px;
            background-position: 0 0, 0 0, 35px 60.5px, 35px 60.5px, 0 0, 35px 60.5px;
          }

          .ripple {
            animation-duration: 4.5s;
          }

          .ripple-1 { width: 45px; height: 45px; }
          .ripple-2 { width: 60px; height: 60px; }
          .ripple-3 { width: 35px; height: 35px; }
          .ripple-4 { width: 50px; height: 50px; }
          .ripple-5 { width: 65px; height: 65px; }
          .ripple-6 { width: 30px; height: 30px; }
          .ripple-7 { width: 55px; height: 55px; }
          .ripple-8 { width: 40px; height: 40px; }
        }

        @media (max-width: 480px) {
          .hexagon-pattern {
            background-size: 60px 104px;
            background-position: 0 0, 0 0, 30px 52px, 30px 52px, 0 0, 30px 52px;
            opacity: 0.15;
          }

          .ripple {
            animation-duration: 4s;
            border-width: 1px;
          }

          .ripple-1 { width: 35px; height: 35px; }
          .ripple-2 { width: 45px; height: 45px; }
          .ripple-3 { width: 25px; height: 25px; }
          .ripple-4 { width: 40px; height: 40px; }
          .ripple-5 { width: 50px; height: 50px; }
          .ripple-6 { width: 20px; height: 20px; }
          .ripple-7 { width: 42px; height: 42px; }
          .ripple-8 { width: 30px; height: 30px; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundPattern;