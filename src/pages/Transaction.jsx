import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { axiosI } from "../axios";

const Transaction = () => {
  const [trans, settrans] = useState([]);
  const [refundStatus, setRefundStatus] = useState({});


  const getTransactions = async () => {
    const { data } = await axiosI.get("/transaction");
    console.log(data.transactions);
    settrans(data?.transactions);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const HandleRefund = async (paymentId, amount, index) => {
    try {
      // Mark refund as initiated in the frontend
      setRefundStatus((prevStatus) => ({ ...prevStatus, [index]: "initiated" }));
  
      const res = await axiosI.post("/refund", { paymentId, amount });
      console.log(res);
  
      if (res.status === 200) {
        const res2 = await axiosI.get("/cancel-membership");
        alert("Refund Successful");
        setRefundStatus((prevStatus) => ({ ...prevStatus, [index]: "success" }));
        getTransactions(); // Refresh the transaction list
      }
    } catch (error) {
      console.error("Refund Error:", error);
      alert("Refund Failed");
      setRefundStatus((prevStatus) => ({ ...prevStatus, [index]: "failed" }));
    }
  };
  

  // Helper function to check if the transaction is within the last 2 days
  const isRefundable = (transactionDate) => {
    const currentDate = new Date();
    const transactionDateObj = new Date(transactionDate);
    const diffInTime = currentDate - transactionDateObj; // Difference in milliseconds
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert to days
    return diffInDays <= 2; // Return true if transaction is within the last 2 days
  };

  return (
    <div>
      <Navbar />

      <div className="relative overflow-x-auto py-44 w-4/5 m-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S No.
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                Expiry Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {trans &&
              trans.map((e, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">{e._id}</td>
                  <td className="px-6 py-4">
                    {e?.amount <= 100 ? "Standard" : "Premium"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(e?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                  {new Date(e.amount <= 100 ? new Date(e?.createdAt).getTime() + 45 * 24 * 60 * 60 * 1000 : new Date(e?.createdAt).getTime() +  60* 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {

                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">₹{e?.amount}</td>

                  <td className="px-6 py-4">
                    {e?.isRefunded ? (
                      <span className="text-green-500 font-bold">
                        Refund Successful
                      </span>
                    ) : refundStatus[i] === "initiated" ? (
                      <span className="text-orange-500 font-bold">
                        Refund Initiated
                      </span>
                    ) : refundStatus[i] === "failed" ? (
                      <span className="text-red-500 font-bold">
                        Refund Failed
                      </span>
                    ) : (
                      isRefundable(e?.transactionDate) && (
                        <button
                          onClick={() =>
                            HandleRefund(e?.paymentId, e?.amount, i)
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Refund
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
