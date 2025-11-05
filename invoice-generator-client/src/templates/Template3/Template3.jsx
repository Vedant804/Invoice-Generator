import './Template3.css';

const Template3 = ({ data }) => {
  return (
    <div className="t3-container">
      {/* Header */}
      <header className="t3-header">
        <div className="t3-company-info">
          {data.companyLogo && (
            <img src={data.companyLogo} alt="Company Logo" className="t3-logo" />
          )}
          <div>
            <h1>{data.companyName}</h1>
            <p>{data.companyAddress}</p>
            <p>Phone: {data.companyPhone}</p>
          </div>
        </div>
        <div className="t3-invoice-details">
          <h2>INVOICE</h2>
          <p><b>Invoice #:</b> {data.invoiceNumber}</p>
          <p><b>Date:</b> {data.invoiceDate}</p>
          <p><b>Due Date:</b> {data.paymentDate}</p>
        </div>
      </header>

      {/* Billing Information */}
      <section className="t3-billing">
        <div>
          <h3>Billed To</h3>
          <p><b>{data.billingName}</b></p>
          <p>{data.billingAddress}</p>
          <p>Phone: {data.billingPhone}</p>
        </div>
        {data.shippingName && (
          <div>
            <h3>Shipped To</h3>
            <p><b>{data.shippingName}</b></p>
            <p>{data.shippingAddress}</p>
            <p>Phone: {data.shippingPhone}</p>
          </div>
        )}
      </section>

      {/* Items Table */}
      <section className="t3-items">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{data.currencySymbol}{Number(item.amount).toFixed(2)}</td>
                <td>{data.currencySymbol}{(item.qty * item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Totals */}
      <section className="t3-totals">
        <div className="t3-total-row">
          <span>Subtotal</span>
          <span>{data.currencySymbol}{data.subtotal.toFixed(2)}</span>
        </div>
        {data.tax > 0 && (
          <div className="t3-total-row">
            <span>Tax ({data.tax}%)</span>
            <span>{data.currencySymbol}{data.taxAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="t3-total-row t3-grand-total">
          <span>Total</span>
          <span>{data.currencySymbol}{data.total.toFixed(2)}</span>
        </div>
      </section>

      {/* Bank Details */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <section className="t3-bank">
          <h3>Bank Details</h3>
          {data.accountName && <p><b>Account Holder:</b> {data.accountName}</p>}
          {data.accountNumber && <p><b>Account Number:</b> {data.accountNumber}</p>}
          {data.accountIfscCode && <p><b>IFSC:</b> {data.accountIfscCode}</p>}
        </section>
      )}

      {/* Remarks Section */}
      {data.notes && (
        <section className="t3-remarks">
          <h3>Remarks</h3>
          <p>{data.notes}</p>
        </section>
      )}

    
    </div>
  );
};

export default Template3;
