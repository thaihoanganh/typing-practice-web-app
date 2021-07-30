import React from "react";

import { Keycap } from ".";

import classes from "./style.module.css";

export const Keyboard: React.FC = () => {
  return (
    <div className={classes.keyboard}>
      <Keycap keyCode={192} value="`" />
      <Keycap keyCode={49} value="1" />
      <Keycap keyCode={50} value="2" />
      <Keycap keyCode={51} value="3" />
      <Keycap keyCode={52} value="4" />
      <Keycap keyCode={53} value="5" />
      <Keycap keyCode={54} value="6" />
      <Keycap keyCode={55} value="7" />
      <Keycap keyCode={56} value="8" />
      <Keycap keyCode={57} value="9" />
      <Keycap keyCode={48} value="0" />
      <Keycap keyCode={189} value="-" />
      <Keycap keyCode={187} value="=" />
      <Keycap keyCode={8} value="Backspace" />

      <Keycap keyCode={9} value="Tab" />
      <Keycap keyCode={81} value="Q" />
      <Keycap keyCode={87} value="W" />
      <Keycap keyCode={69} value="E" />
      <Keycap keyCode={82} value="R" />
      <Keycap keyCode={84} value="T" />
      <Keycap keyCode={89} value="Y" />
      <Keycap keyCode={85} value="U" />
      <Keycap keyCode={73} value="I" />
      <Keycap keyCode={79} value="O" />
      <Keycap keyCode={80} value="P" />
      <Keycap keyCode={219} value="[" />
      <Keycap keyCode={221} value="]" />
      <Keycap keyCode={220} value="\" />

      <Keycap keyCode={20} value="CapsLock" />
      <Keycap keyCode={65} value="A" />
      <Keycap keyCode={83} value="S" />
      <Keycap keyCode={68} value="D" />
      <Keycap keyCode={70} value="F" />
      <Keycap keyCode={71} value="G" />
      <Keycap keyCode={72} value="H" />
      <Keycap keyCode={74} value="J" />
      <Keycap keyCode={75} value="K" />
      <Keycap keyCode={76} value="L" />
      <Keycap keyCode={186} value=";" />
      <Keycap keyCode={222} value="'" />
      <Keycap keyCode={13} value="Enter" />

      <Keycap keyCode={16} value="Shift" />
      <Keycap keyCode={90} value="Z" />
      <Keycap keyCode={88} value="X" />
      <Keycap keyCode={67} value="C" />
      <Keycap keyCode={86} value="V" />
      <Keycap keyCode={66} value="B" />
      <Keycap keyCode={78} value="N" />
      <Keycap keyCode={77} value="M" />
      <Keycap keyCode={188} value="," />
      <Keycap keyCode={190} value="." />
      <Keycap keyCode={191} value="/" />
      <Keycap keyCode={16} location={1} value="/" />

      <Keycap keyCode={17} location={1} value="Ctrl" />
      <Keycap keyCode={18} location={1} value="Alt" />
      <Keycap keyCode={32} value="" />
      <Keycap keyCode={18} location={2} value="Alt" />
      <Keycap keyCode={17} location={2} value="Ctrl" />
    </div>
  );
};

export default Keyboard;
