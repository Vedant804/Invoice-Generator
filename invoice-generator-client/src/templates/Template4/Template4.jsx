import './Template4.css';

const Template4 = ({ data }) => {
  return (
    <div className="template4-container">
      {/* Header Section */}
      <div className="template4-header">
        <div className="template4-accent"></div>
        <div className="template4-header-content">
          <div className="template4-company">
            <h1 className="template4-title">INVOICE</h1>
            <h2>{data.companyName}</h2>
            <p>{data.companyAddress}</p>
            <p>Phone: {data.companyPhone}</p>
          </div>
          {data.companyLogo && (
            <img className="template4-logo" src={data.companyLogo} alt="Company Logo" />
          )}
        </div>
      </div>

      {/* Invoice Meta Info */}
      <div className="template4-meta">
        <div><strong>Invoice #:</strong> {data.invoiceNumber}</div>
        <div><strong>Date:</strong> {data.invoiceDate}</div>
        <div><strong>Due Date:</strong> {data.paymentDate}</div>
      </div>

      {/* Billing and Shipping */}
      <div className="template4-grid">
        <div className="template4-card">
          <h3>Billed To</h3>
          <p><b>{data.billingName}</b></p>
          <p>{data.billingAddress}</p>
          <p>Phone: {data.billingPhone}</p>
        </div>
        {data.shippingName && data.shippingAddress && (
          <div className="template4-card">
            <h3>Shipped To</h3>
            <p><b>{data.shippingName}</b></p>
            <p>{data.shippingAddress}</p>
            <p>Phone: {data.shippingPhone}</p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="template4-table-wrap">
        <table className="template4-table">
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
      </div>

      {/* Totals */}
      <div className="template4-totals">
        <div className="template4-total-card">
          <div><span>Subtotal</span><span>{data.currencySymbol}{data.subtotal.toFixed(2)}</span></div>
          {data.tax > 0 && (
            <div><span>Tax ({data.tax}%)</span><span>{data.currencySymbol}{data.taxAmount.toFixed(2)}</span></div>
          )}
          <div className="template4-grand-total">
            <span>Total</span>
            <span>{data.currencySymbol}{data.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="template4-footer">
        {(data.accountName || data.accountNumber || data.accountIfscCode) && (
          <div className="template4-card">
            <h3>Bank Details</h3>
            {data.accountName && <p>Holder: <b>{data.accountName}</b></p>}
            {data.accountNumber && <p>Account #: {data.accountNumber}</p>}
            {data.accountIfscCode && <p>IFSC: {data.accountIfscCode}</p>}
          </div>
        )}
        {data.notes && (
          <div className="template4-card">
            <h3>Remarks</h3>
            <p>{data.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template4;
