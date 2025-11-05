"use client";

import React from 'react';

const tickers = [
  { name: 'OGUSD', price: '$1.00' },
  { name: 'AMZN', price: '$3.21' },
  { name: 'BIO', price: '$0.42' },
  { name: 'REN', price: '$1.87' },
  { name: 'AGRI', price: '$0.73' },
  { name: 'AQUA', price: '$0.64' },
  { name: 'NIL', price: '$2.10' },
  { name: 'ECO', price: '$0.95' },
];

const PriceTicker = () => {
  const TickerContent = () => {
    return (
      <div className="flex flex-shrink-0 items-center">
        {tickers.map((item, index) => (
          <React.Fragment key={index}>
            <span className="px-2">{item.name}</span>
            <span className="px-2">{item.price}</span>
            <span className="px-2">•</span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-primary text-primary-foreground font-ticker">
      <div className="relative flex overflow-hidden py-1.5">
        <div className="flex whitespace-nowrap animate-marquee">
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;
