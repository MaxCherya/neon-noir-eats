import React, { useEffect, useState } from 'react';
import './shimmeringLight.css'; // Ensure this is the correct path to your CSS file

const ShimmeringLight = () => {
  const [position, setPosition] = useState({
    top: `${Math.random() * 100}%`, // Random top between 20% and 60%
    left: `${Math.random() * 100}%`, // Random left between 0% and 100%
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTop = `${Math.random() * 100}%`; // Random top between 20% and 80%
      const newLeft = `${Math.random() * 100}%`; // Random left between 0% and 100%
      setPosition({ top: newTop, left: newLeft });
    }, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return <span className="shimmering-light" style={position}></span>;
};

export default ShimmeringLight;
