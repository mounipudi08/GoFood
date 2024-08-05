import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderEmail, setOrderEmail] = useState("");

  const fetchMyOrder = async () => {
    try {
      // Make API call to fetch order data
      const response = await fetch(
        "http://localhost:3001/api/order/myOrderData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"), // Replace with the actual email
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Fetched data:", data);

      // Extract orderId, orderEmail, and orderData from the API response
      const { _id, email, order_data } = data.orderData;
      setOrderId(_id);
      setOrderEmail(email);
      setOrderData(order_data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state here
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Order Details</h1>
        <p>ID: {orderId}</p>
        <p>Email: {orderEmail}</p>
        <div>
          {orderData.map((group, index) => (
            <div key={index}>
              <h2>Order Item {index + 1}</h2>
              {group.map((item, idx) => (
                <div key={idx}>
                  <p>Name: {item.name}</p>
                  <p>Quantity: {item.qty}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: {item.price}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Footer } from "../components/Footer";
// import Navbar from "../components/Navbar";

// export default function MyOrder() {
//   const [orderData, setOrderData] = useState([]);
//   const [orderId, setOrderId] = useState("");
//   const [orderEmail, setOrderEmail] = useState("");

//   const fetchMyOrder = async () => {
//     try {
//       // Make API call to fetch order data
//       const response = await fetch(
//         "http://localhost:3001/api/order/myOrderData",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: "shaleem@gmail.com", // Replace with the actual email
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       console.log("Fetched data:", data);

//       // Extract orderId, orderEmail, and orderData from the API response
//       const { id, email, order_data } = data;
//       setOrderId(id);
//       setOrderEmail(email);
//       setOrderData(order_data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle error state here
//     }
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <h1>Order Details</h1>
//         <p>ID: {orderId}</p>
//         <p>Email: {orderEmail}</p>
//         <div>
//           {orderData.map((group, index) => (
//             <div key={index}>
//               <h2>Group {index + 1}</h2>
//               {group.map((item, idx) => (
//                 <div key={idx}>
//                   <p>Name: {item.name}</p>
//                   <p>Quantity: {item.qty}</p>
//                   <p>Size: {item.size}</p>
//                   <p>Price: {item.price}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Footer } from "../components/Footer";
// import Navbar from "../components/Navbar";

// export default function MyOrder() {
//   const [orderData, setOrderData] = useState([]);

//   const fetchMyOrder = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/order/myOrderData",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: localStorage.getItem("userEmail"),
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       console.log("Fetched data:", data);
//       setOrderData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle error state here
//     }
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

// return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <div className="row">
//           {orderData.map((data, index) => (
//             <div key={index}>
//               {data.orderData
//                 ? data.orderData.order_data
//                     .slice(0)
//                     .reverse()
//                     .map((item, idx) => (
//                       <div key={idx}>
//                         {item.map((arrayData, i) => (
//                           <div key={i}>
//                             {arrayData.Order_date ? (
//                               <div className="m-auto mt-5" key={i}>
//                                 {arrayData.Order_date}
//                                 <hr />
//                               </div>
//                             ) : (
//                               <div className="col-12 col-md-6 col-lg-3" key={i}>
//                                 <div
//                                   className="card mt-3"
//                                   style={{ width: "16rem", maxHeight: "360px" }}
//                                 >
//                                   <img
//                                     src={arrayData.img}
//                                     className="card-img-top"
//                                     alt="..."
//                                     style={{
//                                       height: "120px",
//                                       objectFit: "fill",
//                                     }}
//                                   />
//                                   <div className="card-body">
//                                     <h5 className="card-title">
//                                       {arrayData.name}
//                                     </h5>
//                                     <div
//                                       className="container w-100 p-0"
//                                       style={{ height: "38px" }}
//                                     >
//                                       <span className="m-1">
//                                         {arrayData.qty}
//                                       </span>
//                                       <span className="m-1">
//                                         {arrayData.size}
//                                       </span>
//                                       <span className="m-1">{data}</span>
//                                       <div className="d-inline ms-2 h-100 w-20 fs-5">
//                                         ₹{arrayData.price}/-
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ))
//                 : ""}
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
// return (
//   <div>
//     <Navbar />
//     <div className="container">
//       <div className="row">
//         {Array.isArray(orderData) ? (
//           orderData.map((data, index) => (
//             <div key={index}>
//               {data.orderData ? (
//                 data.orderData.order_data
//                   .slice(0)
//                   .reverse()
//                   .map((item, idx) => (
//                     <div key={idx}>
//                       {item.map((arrayData, i) => (
//                         <div key={i}>
//                           {arrayData.Order_date ? (
//                             <div className="m-auto mt-5" key={i}>
//                               {arrayData.Order_date}
//                               <hr />
//                             </div>
//                           ) : (
//                             <div className="col-12 col-md-6 col-lg-3" key={i}>
//                               <div
//                                 className="card mt-3"
//                                 style={{ width: "16rem", maxHeight: "360px" }}
//                               >
//                                 <img
//                                   src={arrayData.img}
//                                   className="card-img-top"
//                                   alt="..."
//                                   style={{ height: "120px", objectFit: "fill" }}
//                                 />
//                                 <div className="card-body">
//                                   <h5 className="card-title">{arrayData.name}</h5>
//                                   <div className="container w-100 p-0" style={{ height: "38px" }}>
//                                     <span className="m-1">{arrayData.qty}</span>
//                                     <span className="m-1">{arrayData.size}</span>
//                                     <span className="m-1">{data}</span>
//                                     <div className="d-inline ms-2 h-100 w-20 fs-5">
//                                       ₹{arrayData.price}/-
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ))
//               ) : (
//                 ""
//               )}
//             </div>
//           ))
//         ) : (
//           <p>Order data is not in the expected format</p>
//         )}
//       </div>
//     </div>
//     <Footer />
//   </div>
//     return (
//   <div>
//     <h1>Order Details</h1>
//     <p>ID: {orderId}</p>
//     <p>Email: {orderEmail}</p>
//     <div>
//       {orderData.map((group, index) => (
//         <div key={index}>
//           <h2>Group {index + 1}</h2>
//           {group.map((item, idx) => (
//             <div key={idx}>
//               <p>Name: {item.name}</p>
//               <p>Quantity: {item.qty}</p>
//               <p>Size: {item.size}</p>
//               <p>Price: {item.price}</p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   </div>
// );
// }
// import React, { useEffect, useState } from "react";
// import { Footer } from "../components/Footer";
// import Navbar from "../components/Navbar";

// export default function MyOrder() {
//   const [orderData, setorderData] = useState("");

//   const fetchMyOrder = async () => {
//     console.log(localStorage.getItem("userEmail"));
//     await fetch("http://localhost:3001/api/order/myOrderData", {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: localStorage.getItem("userEmail"),
//       }),
//     }).then(async (res) => {
//       let response = await res.json();
//       await setorderData(response);
//     });

//     // await res.map((data)=>{
//     //    console.log(data)
//     // })
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>
//       <div className="container">
//         <div className="row">
//           {orderData !== {}
//             ? Array(orderData).map((data) => {
//               return data.orderData ?
//                   data.orderData.order_data
//                       .slice(0)
//                       .reverse()
//                       .map((item) => {
//                         return item.map(arrayData => {
//                           return (
//                             <div>
//                               {arrayData.Order_date ? (
//                                 <div className="m-auto mt-5">
//                                   {(data = arrayData.Order_date)}
//                                   <hr />
//                                 </div>
//                               ) : (
//                                 <div className="col-12 col-md-6 col-lg-3">
//                                   <div
//                                     className="card mt-3"
//                                     style={{
//                                       width: "16rem",
//                                       maxHeight: "360px",
//                                     }}
//                                   >
//                                     <img
//                                       src={arrayData.img}
//                                       className="card-img-top"
//                                       alt="..."
//                                       style={{
//                                         height: "120px",
//                                         objectFit: "fill",
//                                       }}
//                                     />
//                                     <div className="card-body">
//                                       <h5 className="card-title">
//                                           {arrayData.name}
//                                       </h5>
//                                       <div
//                                         className="container w-100 p-0"
//                                         style={{ height: "38px" }}
//                                       >
//                                         <span className="m-1">
//                                           {arrayData.qty}
//                                         </span>
//                                         <span className="m-1">
//                                           {arrayData.size}
//                                         </span>
//                                         <span className="m-1">{data}</span>
//                                         <div className=" d-inline ms-2 h-100 w-20 fs-5">
//                                           ₹{arrayData.price}/-
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         });
//                       })
//                   : "";
//               })
//             : ""}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Footer } from "../components/Footer";
// import Navbar from "../components/Navbar";

// export default function MyOrder() {
//   const [orderData, setOrderData] = useState([]);

//   // const fetchMyOrder = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "http://localhost:3001/api/order/myOrderData",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           email: localStorage.getItem("userEmail"),
//   //         }),
//   //       }
//   //     );
//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch data");
//   //     }
//   //     const data = await response.json();
//   //     setOrderData(data);
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //     // Handle error state here
//   //   }
//   // };

//   const fetchMyOrder = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/order/myOrderData",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: localStorage.getItem("userEmail"),
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       console.log("Fetched data:", data); // Log fetched data
//       setOrderData(data); // Update state with fetched data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle error state here
//     }
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <div className="row">
//           {orderData.map((data, index) => (
//             <div key={index}>
//               {data.orderData
//                 ? data.orderData.order_data
//                     .slice(0)
//                     .reverse()
//                     .map((item, idx) => (
//                       <div key={idx}>
//                         {item.map((arrayData, i) => (
//                           <div key={i}>
//                             {arrayData.Order_date ? (
//                               <div className="m-auto mt-5" key={i}>
//                                 {arrayData.Order_date}
//                                 <hr />
//                               </div>
//                             ) : (
//                               <div className="col-12 col-md-6 col-lg-3" key={i}>
//                                 <div
//                                   className="card mt-3"
//                                   style={{ width: "16rem", maxHeight: "360px" }}
//                                 >
//                                   <img
//                                     src={arrayData.img}
//                                     className="card-img-top"
//                                     alt="..."
//                                     style={{
//                                       height: "120px",
//                                       objectFit: "fill",
//                                     }}
//                                   />
//                                   <div className="card-body">
//                                     <h5 className="card-title">
//                                       {arrayData.name}
//                                     </h5>
//                                     <div
//                                       className="container w-100 p-0"
//                                       style={{ height: "38px" }}
//                                     >
//                                       <span className="m-1">
//                                         {arrayData.qty}
//                                       </span>
//                                       <span className="m-1">
//                                         {arrayData.size}
//                                       </span>
//                                       <span className="m-1">{data}</span>
//                                       <div className="d-inline ms-2 h-100 w-20 fs-5">
//                                         ₹{arrayData.price}/-
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ))
//                 : ""}
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// // {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
// import React, { useEffect, useState } from "react";
// import { Footer } from "../components/Footer";
// import Navbar from "../components/Navbar";

// export default function MyOrder() {
//   const [orderData, setorderData] = useState("");

//   const fetchMyOrder = async () => {
//     console.log(localStorage.getItem("userEmail"));
//     await fetch("http://localhost:3001/api/order/myOrderData", {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: localStorage.getItem("userEmail"),
//       }),
//     }).then(async (res) => {
//       let response = await res.json();
//       await setorderData(response);
//     });

//     // await res.map((data)=>{
//     //    console.log(data)
//     // })
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>
//       <div className="container">
//         <div className="row">
//           {orderData !== {}
//             ? Array(orderData).map((data) => {
//               return data.orderData ?
//                   data.orderData.order_data
//                       .slice(0)
//                       .reverse()
//                       .map((item) => {
//                         return item.map(arrayData => {
//                           return (
//                             <div>
//                               {arrayData.Order_date ? (
//                                 <div className="m-auto mt-5">
//                                   (data = arrayData.Order_date)
//                                   <hr />
//                                 </div>
//                               ) : (
//                                 <div className="col-12 col-md-6 col-lg-3">
//                                   <div
//                                     className="card mt-3"
//                                     style={{
//                                       width: "16rem",
//                                       maxHeight: "360px",
//                                     }}
//                                   >
//                                     <img
//                                       src={arrayData.img}
//                                       className="card-img-top"
//                                       alt="..."
//                                       style={{
//                                         height: "120px",
//                                         objectFit: "fill",
//                                       }}
//                                     />
//                                     <div className="card-body">
//                                       <h5 className="card-title">
//                                           arrayData.name
//                                       </h5>
//                                       <div
//                                         className="container w-100 p-0"
//                                         style={{ height: "38px" }}
//                                       >
//                                         <span className="m-1">
//                                           arrayData.qty
//                                         </span>
//                                         <span className="m-1">
//                                           arrayData.size
//                                         </span>
//                                         <span className="m-1">{data}</span>
//                                         <div className=" d-inline ms-2 h-100 w-20 fs-5">
//                                           ₹arrayData.price/-
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         });
//                       })
//                   : "";
//               })
//             : ""}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
