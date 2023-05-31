import React, { useState } from "react";
import styles from "./styles.module.scss";
import { BiSearch } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { IHeaderProps, colors } from "values";
import ClickableDiv from "../ClickableDiv";
import { useNavigate } from "react-router-dom";
const Header = ({ hideButtons, query, setQuery }: IHeaderProps) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src="logo.png" className={styles.logo} alt="logo" />
      {!hideButtons && (
        <div className={styles.subDiv}>
          {showSearchBox && setQuery ? (
            <div className={styles.searchBox}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title"
              />
              <ClickableDiv onPress={() => setShowSearchBox(false)}>
                <IoCloseSharp size={20} color={colors.WHITE} />
              </ClickableDiv>
            </div>
          ) : (
            <ClickableDiv onPress={() => setShowSearchBox(true)}>
              <BiSearch color={colors.WHITE} size={20} />
            </ClickableDiv>
          )}
          <ClickableDiv zoomDisabled onPress={() => navigate("/upload")}>
            <p>Upload a video</p>
          </ClickableDiv>
        </div>
      )}
    </div>
  );
};

export default Header;
