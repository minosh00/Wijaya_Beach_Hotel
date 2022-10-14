
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap'


const AllOrders = () => {
  const [serachItem, setserachItem] = useState([]);
  const [users, setusers] = useState();
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:5000/orders/allorder/")
      ).data;
      setusers(data);
      console.log(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, []);

  return (
    <div className="container"><br /><br /><br />
         <h3 >All Orders </h3>      
      <div class="input-group">
     
      </div>
      <br></br>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">

      </div> <br/>

      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>User Name </th>
            <th scope='col'>Street</th>
            <th scope='col'>City</th>
            <th scope='col'> All  Orders</th>
    
          </tr>
        </MDBTableHead>
        <MDBTableBody >
          {users &&
            users.filter((users) => {
              if (serachItem == "") {
                return users
              } else if (users._id.toLowerCase().includes(serachItem.toLowerCase())) {

                return users
              }
            })
              .map((item) => {
                return (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>   
                              
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{item?.user?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='fw-normal mb-1'>{item?.user?.street}</p>
                    </td>           
                    <td>
                      <p className='fw-normal mb-1'>{item?.user?.city}</p>
                    </td>
                    <td>
                        <tr>
                          <th scope='col'>Name </th> &nbsp;&nbsp;&nbsp;&nbsp;
                          <th scope='col'>Amount</th> &nbsp;&nbsp;&nbsp;&nbsp;
                          <th scope='col'>Price</th> &nbsp;&nbsp;&nbsp;&nbsp;
                        </tr>
                      {item?.orderedItems.map((order)=>(
                        <tr>
                          <td>{order?.name}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                          <td>{order?.amount}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                          <td>{order?.price}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                        </tr>
                      ))}
                    </td>
                  </tr>
                );
              })}
        </MDBTableBody>
      </MDBTable>

    </div>

  );
}
export default AllOrders;