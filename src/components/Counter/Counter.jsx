import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

import "./Counter.css";

function Number({ mv, number, height }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function Digit({ place, value, height, digitStyle }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);
  return (
    <div className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export default function Counter({
                                  value,
                                  fontSizeRem = "1.25rem",
                                  padding = 0,
                                  places = [100, 10, 1],
                                  gap = 0,
                                  borderRadius = 4,
                                  horizontalPadding = 8,
                                  textColor = "black",
                                  fontWeight = "bold",
                                  containerStyle,
                                  counterStyle,
                                  digitStyle,
                                  fontStyle = "normal",
                                }) {
  const fontSize = remToPx(parseFloat(fontSizeRem));
  const height = fontSize + padding;
  const defaultCounterStyle = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight,
    fontStyle: fontStyle,
  };

  return (
    <div className="counter-container" style={containerStyle}>
      <div
        className="counter-counter"
        style={{ ...defaultCounterStyle, ...counterStyle, display: "flex", flexDirection: "row" }}
      >
        {places.map((place) => (
          <Digit
            key={place}
            place={place}
            value={value}
            height={height}
            digitStyle={digitStyle}
          />
        ))}
        &nbsp;
        <span className="counter-star-wrapper">
          <span className="counter-star">⭐</span>
        </span>
      </div>
    </div>
  );
}
