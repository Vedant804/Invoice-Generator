import './Template1.css';

const Template1 = ({ data }) => (
  <div className="template1-simple">
    {/* Header */}
    <div className="template1-header">
      {data.companyLogo && (
        <img src={data.companyLogo} alt="Company Logo" className="template1-logo" />
      )}
      <div>
        <h2 className="template1-company">{data.companyName}</h2>
        <div className="template1-address">{data.companyAddress}</div>
        <div className="template1-phone">Phone: {data.companyPhone}</div>
      </div>
    </div>

    {/* Invoice Info */}
    <div className="template1-invoice-meta">
      <span><b>Invoice #:</b> {data.invoiceNumber}</span>
      <span><b>Date:</b> {data.invoiceDate}</span>
      <span><b>Due Date:</b> {data.paymentDate}</span>
    </div>

    {/* Billing/Shipping */}
    <div className="template1-bill-ship">
      <div>
        <h4>Billed To</h4>
        <div>{data.billingName}</div>
        <div>{data.billingAddress}</div>
        <div>Phone: {data.billingPhone}</div>
      </div>
      {data.shippingName && data.shippingAddress && (
        <div>
          <h4>Shipped To</h4>
          <div>{data.shippingName}</div>
          <div>{data.shippingAddress}</div>
          <div>Phone: {data.shippingPhone}</div>
        </div>
      )}
    </div>

    {/* Items Table */}
    <table className="template1-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.items.map((item, idx) => (
          <tr key={idx}>
            <td>{item.name}</td>
            <td>{item.qty}</td>
            <td>{data.currencySymbol ? data.currencySymbol : "₹"}{Number(item.amount).toFixed(2)}</td>
            <td>{data.currencySymbol ? data.currencySymbol : "₹"}{(Number(item.qty) * Number(item.amount)).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Totals */}
    <div className="template1-totals">
      <div>Subtotal: {data.currencySymbol ? data.currencySymbol : "₹"}{data.subtotal.toFixed(2)}</div>
      {data.tax > 0 && (
        <div>Tax ({data.tax}%): {data.currencySymbol ? data.currencySymbol : "₹"}{data.taxAmount.toFixed(2)}</div>
      )}
      <div><b>Total: {data.currencySymbol ? data.currencySymbol : "₹"}{data.total.toFixed(2)}</b></div>
    </div>

    {/* Bank */}
    {(data.accountName || data.accountNumber || data.accountIfscCode) && (
      <div className="template1-bank">
        <h4>Bank Account</h4>
        {data.accountName && <div>Holder: {data.accountName}</div>}
        {data.accountNumber && <div>Account #: {data.accountNumber}</div>}
        {data.accountIfscCode && <div>IFSC: {data.accountIfscCode}</div>}
      </div>
    )}

    {/* Remarks at the bottom */}
    {data.notes && (
      <div className="template1-remarks">
        <h4>Remarks</h4>
        <div>{data.notes}</div>
      </div>
    )}
  </div>
);

export default Template1;
