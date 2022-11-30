import React from "react";

const Bill = ({ item, handleClick, reference }) => {
  return (
    <div ref={reference}>
      <div className="mt-100 mb-100">
        <div id="ui-view">
          <div>
            <div className="invoice border p-3">
              <div className="card-header">
                Invoice: <strong>{item._id}</strong>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between">
                  <div className="">
                    <div>
                      <strong>SR MARKET Inc.</strong>
                    </div>
                    <div>546 Aston Avenue</div>
                    <div>NYC, NY 12394</div>
                    <div>Email: contact@srmarket.com</div>
                    <div>Phone: +1 848 389 9289</div>
                  </div>
                  <div className="">
                    <div>
                      <strong>Customer</strong>
                    </div>
                    <div>Customer name: {item.name}</div>
                    <div>Customer Phone: {item.phone}</div>
                  </div>
                </div>
                <hr />
                <div className="table-responsive-sm">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th className="center">UNIT</th>
                        <th className="right">COST</th>
                        <th className="right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item?.cartItem.map((item) => (
                        <tr key={item._id}>
                          <td className="left">{item.name}</td>
                          <td className="center">{item.quantity}</td>
                          <td className="right">{item.price}</td>
                          <td className="right">
                            ${item.quantity * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="">
                  <div className="ms-auto">
                    <table className="table table-clear">
                      <tbody>
                        <tr>
                          <td className="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td className="right">${item.subTotal}</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Tax (10%)</strong>
                          </td>
                          <td className="right">${item.tax}</td>
                        </tr>

                        <tr>
                          <td className="left">
                            <strong>Total</strong>
                          </td>
                          <td className="right">
                            <strong>${item.total}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="pull-right">
                      <button
                        onClick={handleClick}
                        className="btn btn-sm btn-success"
                      >
                        Proceed to payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
