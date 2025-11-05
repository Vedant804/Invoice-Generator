import './Template2.css';

const Template2 = ({ data }) => {
  return (
    <div className="t2-container">
      {/* Header */}
      <header className="t2-header">
        <div className="t2-header-left">
          {data.companyLogo && <img src={data.companyLogo} alt="logo" className="t2-logo" />}
          <div>
            <h1>{data.companyName}</h1>
            <p>{data.companyAddress}</p>
            <p>{data.companyPhone}</p>
          </div>
        </div>
        <div className="t2-header-right">
          <h2>INVOICE</h2>
          <p><b>No:</b> {data.invoiceNumber}</p>
          <p><b>Date:</b> {data.invoiceDate}</p>
          <p><b>Due:</b> {data.paymentDate}</p>
        </div>
      </header>

      {/* Billing Section */}
      <section className="t2-billing">
        <div>
          <h3>Billed To</h3>
          <p><b>{data.billingName}</b></p>
          <p>{data.billingAddress}</p>
          <p>{data.billingPhone}</p>
        </div>
        {data.shippingName && (
          <div>
            <h3>Shipped To</h3>
            <p><b>{data.shippingName}</b></p>
            <p>{data.shippingAddress}</p>
            <p>{data.shippingPhone}</p>
          </div>
        )}
      </section>

      {/* Items Table */}
      <table className="t2-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{data.currencySymbol}{Number(item.amount).toFixed(2)}</td>
              <td>{data.currencySymbol}{(item.qty * item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="t2-totals">
        <div><span>Subtotal</span><span>{data.currencySymbol}{data.subtotal.toFixed(2)}</span></div>
        {data.tax > 0 && (
          <div><span>Tax ({data.tax}%)</span><span>{data.currencySymbol}{data.taxAmount.toFixed(2)}</span></div>
        )}
        <div className="t2-total-final">
          <span>Total</span>
          <span>{data.currencySymbol}{data.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Bank Details */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <section className="t2-bank">
          <h3>Bank Details</h3>
          {data.accountName && <p><b>Account Holder:</b> {data.accountName}</p>}
          {data.accountNumber && <p><b>Account Number:</b> {data.accountNumber}</p>}
          {data.accountIfscCode && <p><b>IFSC:</b> {data.accountIfscCode}</p>}
        </section>
      )}

      {/* Remarks */}
      {data.notes && (
        <section className="t2-remarks">
          <h3>Remarks</h3>
          <div className="t2-remarks-box">
            <p>{data.notes}</p>
          </div>
        </section>
      )}

      
    </div>
  );
};

export default Template2;
