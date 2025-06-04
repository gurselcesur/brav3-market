'use client';

import React from "react";

const SaleBanner = () => {
  const messages = [
    "SALE!",
    "THE BOSS HAS LOST IT!",
    "EVERYTHING MUST GO!",
    "90% OFF?!",
    "WE’RE LOSING MONEY ON THIS!",
    "DON’T MISS THIS DEAL!",
    "WHAT EVEN IS THIS?!",
    "FIRST COME, FIRST SERVED!",
  ];

  // loop ile uzun hale getiriyoruz
  const loopedMessages = Array.from({ length: 30 }, (_, i) => messages[i % messages.length]);

  return (
    <>
      <style>
        {`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .marquee-track {
            width: 200%;
            display: flex;
            animation: marqueeScroll 15s linear infinite;
          }
        `}
      </style>

      <div className="relative overflow-hidden bg-black py-3 border-y-2 border-green-500">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex space-x-12 whitespace-nowrap"
            >
              {loopedMessages.map((word, index) => (
                <span
                  key={`${i}-${index}`}
                  className="text-green-500 text-2xl font-pixelify font-extrabold uppercase"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SaleBanner;