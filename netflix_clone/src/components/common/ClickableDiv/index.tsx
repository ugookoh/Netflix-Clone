import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onPress?: Function;
  disabled?: boolean;
  zoomDisabled?: boolean;
  style?: React.CSSProperties;
}

const ClickableDiv = ({ children, onPress, className, style = {}, disabled, id, zoomDisabled }: Props) => {
  return (
    <div
      id={id}
      className={clsx(
        disabled ? styles.containerDisabled : styles.container,
        styles.noselect,
        !!className && className,
        !zoomDisabled && styles.containerZoom
      )}
      style={{ ...style }}
      onClick={
        disabled
          ? undefined
          : (e) => {
              e.stopPropagation();
              !!onPress && onPress();
            }
      }
    >
      {children}
    </div>
  );
};

export default ClickableDiv;
