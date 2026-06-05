import React, { useState, useEffect } from "react";

interface NumberCounterProps {
  value: number;
  duration?: number;
  formatter?: (num: number) => string;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  duration = 1500,
  formatter = (num) => num.toLocaleString("zh-CN", { maximumFractionDigits: 0 })
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (value - startValue) * easeOutCubic;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);
  
  return <span>{formatter(displayValue)}</span>;
};
