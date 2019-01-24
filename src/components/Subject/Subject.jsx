import React from "react";
import styled from "styled-components";
import leftPad from "left-pad";
import colorString from "color-string";

import styles from "./style.module.scss";

const subjectRegex = [
  ["Pracowniasiecikomputerowych", "PSSI"],
  ["Religia", "Religia/Tetyka"],
  ["Tetyka_P", "Religia/Tetyka"],
  ["Systemyoperacyjne", "SO"]
];

function changeHue(rgb, degree) {
  console.log(rgb);
  const color = colorString.get.hex(rgb);
  const hsl = colorString.to.hsl(color);
  const hslParsed = colorString.get.hsl(hsl);
  let hue = parseInt(hslParsed[0]);
  console.log(color.string());
  hue += degree;
  if (hue > 360) {
    hue -= 360;
  } else if (hue < 0) {
    hue += 360;
  }
  console.log(hue);
  let finalColor = colorString.get.hsl(
    `hsl(${hue.toString()}, ${hslParsed[1]}, ${hslParsed[2]})`
  );
  console.log(finalColor);
  console.log(colorString.to.hex(finalColor || [30, 100, 60, 1]));
  console.log("---");
  return colorString.to.hex(finalColor || [30, 100, 60, 1]);
}

function LightenDarkenColor(col, amt) {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let rgb = [
    (num >> 16) + amt,
    ((num >> 8) & 0x00ff) + amt,
    (num & 0x0000ff) + amt
  ];

  for (let i in rgb) {
    if (rgb[i] > 255) rgb[i] = 255;
    else if (rgb[i] < 0) rgb[i] = 0;
  }
  return (
    (usePound ? "#" : "") +
    leftPad((rgb[2] | (rgb[1] << 8) | (rgb[0] << 16)).toString(16), 6, "0")
  );
}
// ${p => LightenDarkenColor(p.color, 40)} 10.35%,
// ${p => LightenDarkenColor(p.color, -40)} 100%

const Box = styled.div`
  background-image: linear-gradient(136.64deg, #514fcc 10.35%, #379bf2 100%);
  box-shadow: 0px 8px 12px ${p => `#519bf299`};
  color: #ffffff;
  font-size: 36px;
  text-align: left;
  padding: 27px;
  margin: 18px;
  min-width: 250px;
  max-width: 350px;
  border-radius: 30px;
`;

/**
 * @name Subject
 * @description One subject block of lesson plan.
 * @example
 * <Subject name="Math" classroom="16" color="#B036C3" now />
 * <Subject name="Math" classroom="16" color="#FF9933" next />
 * <Subject name="Math" classroom="16" color="#0B883D" />
 */
export default class Subject extends React.Component {
  getName = () => {
    // console.log(this.props.name);
    for (const re of subjectRegex) {
      // console.log(re);
      if (this.props.name.indexOf(re[0]) !== -1) {
        return re[1];
      }
      return this.props.name;
    }
  };

  render() {
    return (
      <Box>
        {this.props.now ? (
          <h1 className={styles.now}>Now</h1>
        ) : this.props.next ? (
          <h2 className={styles.next}>Next</h2>
        ) : null}
        <p className={styles["subject-name"]}>{this.getName()}</p>
        <p className={styles["subject-classroom"]}>{this.props.classroom}</p>
      </Box>
    );
  }
}
