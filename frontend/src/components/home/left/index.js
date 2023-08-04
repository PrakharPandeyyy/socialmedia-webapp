import LeftLink from "./LeftLink";
import "./style.css";
import { Link } from "react-router-dom";
import { left } from "../../../data/home";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import Shortcut from "./ShortCut";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <br />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((item, index) => (
        <LeftLink
          key={index}
          img={item.img}
          text={item.text}
          notification={item.notification}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((item, index) => (
            <LeftLink
              key={index}
              img={item.img}
              text={item.text}
              notification={item.notification}
            />
          ))}
          <div
            className="left_link hover1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show Less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
        link="https://www.github.com/PrakharPandeyyy"
        img ="data:image/png;base64,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"
        name="My Github"
        />
      </div>
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>{" "}
        </Link>
        <span>. </span>
        <Link to="/"></Link>Cookies <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
}
