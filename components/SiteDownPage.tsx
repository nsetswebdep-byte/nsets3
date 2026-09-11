/** Plain server-error style page — shown on every route when SITE_DOWN_MODE is on. */
export default function SiteDownPage() {
  return (
    <div
      style={{
        margin: 0,
        padding: "40px 20px",
        fontFamily: "Times New Roman, Times, serif",
        fontSize: "16px",
        backgroundColor: "#ffffff",
        color: "#000000",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "22px", fontWeight: "bold", margin: "0 0 16px 0" }}>
        503 Service Unavailable
      </h1>
      <p style={{ margin: "0 0 12px 0", lineHeight: 1.4 }}>
        The server is temporarily unable to service your request due to maintenance downtime or capacity
        problems. Please try again later.
      </p>
      <hr style={{ border: "none", borderTop: "1px solid #cccccc", margin: "20px 0" }} />
      <address style={{ fontStyle: "normal", fontSize: "13px", color: "#666666" }}>
        Web Server at nsets.com.pk
      </address>
    </div>
  );
}
