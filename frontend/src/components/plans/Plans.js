import React, { useEffect, useState, useContext} from "react";
import "./plan.css";
import { AppContext } from "../../utils/AppContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Plans({ change }) {
  const [plans, setPlans] = useState(null);
  const [togggle, setToggle] = useState("month");
  const [selectedPlan, setPlan] = useState("Basic");

  const navigate = useNavigate();
  const {baseUrl}  = useContext(AppContext)

  useEffect(() => {
    fetch(baseUrl+"/plans/fetch-all-plans")
    .then((res) => res.json())
    .then((data) =>  setPlans(data.plans))
  }, []);

  const subscribePlan = () => {
    const period = togggle;
    const planName = selectedPlan.toLowerCase();
    const plan = plans[planName];
    navigate("/payment", {
      state: { period: period, plan: planName, planInfo: plan },
    });
  };

  const setPlanName = (e) => {
    setPlan(e.target.innerText);
  };
  

  const active = {
    margin: "2px 10px",
    border: "none",
    backgroundColor: "white",
    color: "var(--primary)",
    fontWeight: "bold",
    borderRadius: "10px",
  };

  return plans ? (
    <div className="plans__card">
      <Link
        to="/dashboard/"
        onClick={change}
        className="btn btn__secondary"
        style={{
          backgroundColor: "transparent",
          border: "1px solid #1e4d90",
          color: "#1e4d90",
          width: "inherit",
        }}
      >
        View Dashboard
      </Link>
      <h3>Choose the right plan for you</h3>

      <table>
        <tr>
          <th>
            <div id="toggle">
              <button
                onClick={() => setToggle("month")}
                style={togggle === "month" ? active : {}}
              >
                Monthly
              </button>

              <button
                onClick={() => setToggle("year")}
                style={togggle === "year" ? active : {}}
              >
                Yearly
              </button>
            </div>
          </th>

          <th className="box__head">
            <div
              onClick={setPlanName}
              style={
                selectedPlan === "Mobile"
                  ? { backgroundColor: "#1e4d90", opacity: 1 }
                  : {}
              }
            >Mobile
            </div>
          </th>
          <th className="box__head">
            <div
              onClick={setPlanName}
              style={
                selectedPlan === "Basic"
                  ? { backgroundColor: "#1e4d90", opacity: 1 }
                  : {}
              }
            >Basic
            </div>
          </th>
          <th className="box__head">
            <div
              onClick={setPlanName}
              style={
                selectedPlan === "Standard"
                  ? { backgroundColor: "#1e4d90", opacity: 1 }
                  : {}
              }
            >Standard
            </div>
          </th>
          <th className="box__head">
            <div
              onClick={setPlanName}
              style={
                selectedPlan === "Premium"
                  ? { backgroundColor: "#1e4d90", opacity: 1 }
                  : {}
              }
            >Premium
            </div>
          </th>
        </tr>

        {togggle === "month" ? (
          <tr>
            <td>Monthly Price</td>
            <td
              style={
                selectedPlan === "Mobile"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.mobile["Monthly-Price"]}
            </td>
            <td
              style={
                selectedPlan === "Basic"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.basic["Monthly-Price"]}
            </td>
            <td
              style={
                selectedPlan === "Standard"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.standard["Monthly-Price"]}
            </td>
            <td
              style={
                selectedPlan === "Premium"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.premium["Monthly-Price"]}
            </td>
          </tr>
        ) : (
          <tr>
            <td>Yearly Price</td>
            <td
              style={
                selectedPlan === "Mobile"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.mobile["Yearly-Price"]}
            </td>
            <td
              style={
                selectedPlan === "Basic"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.basic["Yearly-Price"]}
            </td>
            <td
              style={
                selectedPlan === "Standard"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.standard["Yearly-Price"]}
            </td>
            <td
              style={
                selectedPlan === "Premium"
                  ? { color: "#1e4d90", fontWeight: "bold" }
                  : {}
              }
            >
              &#8377; {plans.premium["Yearly-Price"]}
            </td>
          </tr>
        )}

        <tr>
          <td>Video Quality</td>
          <td
            style={
              selectedPlan === "Mobile"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.mobile["Video-Quality"]}
          </td>
          <td
            style={
              selectedPlan === "Basic"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.basic["Video-Quality"]}
          </td>
          <td
            style={
              selectedPlan === "Standard"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.standard["Video-Quality"]}
          </td>
          <td
            style={
              selectedPlan === "Premium"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.premium["Video-Quality"]}
          </td>
        </tr>
        <tr>
          <td>Resolution</td>
          <td
            style={
              selectedPlan === "Mobile"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.mobile["Resolution"]}
          </td>
          <td
            style={
              selectedPlan === "Basic"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.basic["Resolution"]}
          </td>
          <td
            style={
              selectedPlan === "Standard"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.standard["Resolution"]}
          </td>
          <td
            style={
              selectedPlan === "Premium"
                ? { color: "#1e4d90", fontWeight: "bold" }
                : {}
            }
          >
            {plans.premium["Resolution"]}
          </td>
        </tr>
       

        <tr>
          <td id="watch">
            <p>Device you can use to watch</p>
            <p>Device you can use to watch</p>
            <p>Device you can use to watch</p>
            <p>Device you can use to watch</p>
          </td>
          <td id="two">
            <p style={{ visibility: "visible" }}>Phone</p>
            <p style={{ visibility: "visible" }}>Tablet</p>
            <p>tab</p>
            <p>tab</p>
          </td>
          <td>
            <p>Phone</p>
            <p>Tablet</p>
            <p >Computer</p>
            <p >TV</p>
          </td>
          <td>
            <p>Phone</p>
            <p>Tablet</p>
            <p>Computer</p>
            <p >TV</p>
          </td>
          <td>
            <p>Phone</p>
            <p>Tablet</p>
            <p>Computer</p>
            <p >TV</p>
          </td>
        </tr>
      </table>

      <button onClick={subscribePlan} className="btn" id="next">
        Next
      </button>
    </div>
  ) : (
    <h1 style={{ color: "white" }}>Please wait while we are fetching plans ....</h1>
  );
}
