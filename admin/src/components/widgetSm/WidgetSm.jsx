import React from "react";
import { Link } from "react-router-dom";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useGlobalContext } from "../../context/context";

function WidgetSm() {
    const { users } = useGlobalContext();

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map((user) => (
                    <li className="widgetSmListItem" key={user.id}>
                        <img
                            src={
                                user.avatar ||
                                "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            }
                            alt="user-img"
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">
                                {user.username}
                            </span>
                        </div>
                        <Link
                            to={`/user/${user.id}`}
                            className="widgetSmButton"
                        >
                            <Visibility className="widgetSmIcon" />
                            Display
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WidgetSm;
