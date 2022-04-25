import React, { useState, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeatureInfo from "../../components/featureInfo/FeatureInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useGlobalContext } from "../../context/context";
import { userData } from "../../dummyData";
import Login from "../login/LogIn";
import "./home.css";
import axios from "axios";

function Home() {
    const { checkLogin } = useGlobalContext();

    // const [revenue, setRevenue] = useState([]);

    // const fetchRevenue = async () => {
    //     const res = await axios.get(
    //         "http://localhost:8080/doubleK/api/revenue/all",
    //         {
    //             headers: {
    //                 Authorization: document?.cookie
    //                     ?.split("; ")
    //                     .find((token) => token.includes("doubleKToken"))
    //                     .split("=")[1],
    //             },
    //         }
    //     );

    //     if (res.data) {
    //         setRevenue(res.data);
    //     } else {
    //         setRevenue([]);
    //     }
    // };

    // useEffect(() => {
    //     fetchRevenue();
    // }, []);

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="home">
            <FeatureInfo />
            <Chart title="Revenue" grid dataKey="totalRevenue"/>
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}

export default Home;
