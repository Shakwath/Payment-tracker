import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    padding: 0,
  },

  // Header band
  headerBand: {
    backgroundColor: "#9603F8",
    paddingVertical: 28,
    paddingHorizontal: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandCol: {
    flexDirection: "column",
    gap: 3,
  },
  brandName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 8,
    color: "#E9D5FF",
    letterSpacing: 1,
  },
  receiptBadge: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  receiptBadgeLabel: {
    fontSize: 7,
    color: "#9603F8",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
  },
  receiptBadgeId: {
    fontSize: 9,
    color: "#7805F5",
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
  },

  // Sub-header strip
  subHeader: {
    backgroundColor: "#F3E8FF",
    paddingVertical: 8,
    paddingHorizontal: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeaderText: {
    fontSize: 8,
    color: "#7C3AED",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
  },

  // Body
  body: {
    paddingHorizontal: 36,
    paddingVertical: 20,
  },

  // Two-column info section
  infoGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    position: "relative",
    overflow: "hidden",
  },
  infoCardTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#9603F8",
    letterSpacing: 1.2,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E9D5FF",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 8,
    color: "#6B7280",
    width: 90,
    fontFamily: "Helvetica",
  },
  infoValue: {
    fontSize: 8,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
    flex: 1,
  },

  // Fee breakdown table
  tableContainer: {
    marginBottom: 16,
  },
  tableTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#9603F8",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#9603F8",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 1,
  },
  tableHeaderText: {
    fontSize: 8,
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  tableRowAlt: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  colDescription: { flex: 3 },
  colAmount: { flex: 1, textAlign: "right" },
  tableCell: {
    fontSize: 8,
    color: "#374151",
    fontFamily: "Helvetica",
  },
  tableCellBold: {
    fontSize: 8,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
  },

  // Total section
  totalBar: {
    flexDirection: "row",
    backgroundColor: "#F3E8FF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#7805F5",
    letterSpacing: 0.5,
  },
  totalAmount: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#9603F8",
  },

  // Payment method
  paymentMethod: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  methodCard: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  methodDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9603F8",
  },
  methodLabel: {
    fontSize: 7,
    color: "#6B7280",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  methodValue: {
    fontSize: 10,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#E9D5FF",
    marginVertical: 14,
  },

  // Footer
  footer: {
    backgroundColor: "#F9FAFB",
    borderTopWidth: 2,
    borderTopColor: "#9603F8",
    paddingVertical: 14,
    paddingHorizontal: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerLeft: {
    flexDirection: "column",
    gap: 3,
  },
  footerNote: {
    fontSize: 7,
    color: "#6B7280",
  },
  footerBrand: {
    fontSize: 8,
    color: "#9603F8",
    fontFamily: "Helvetica-Bold",
  },
  footerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 3,
  },
  footerDate: {
    fontSize: 7,
    color: "#9CA3AF",
  },
  authorizedText: {
    fontSize: 7,
    color: "#7C3AED",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },

  // Watermark stamp restricted to Payment Information card
  cardStampContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cardStampInner: {
    transform: "rotate(-18deg)",
    opacity: 0.18,
    borderWidth: 3,
    borderColor: "#9603F8",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  cardStampText: {
    fontSize: 34,
    fontFamily: "Helvetica-Bold",
    color: "#9603F8",
    letterSpacing: 4,
  },
});

function getStatusColors(status) {
  const s = status?.toLowerCase();
  if (s === "successful" || s === "verified" || s === "paid")
    return { bg: "#D1FAE5", text: "#065F46" };
  if (s === "pending") return { bg: "#FEF3C7", text: "#92400E" };
  if (s === "failed" || s === "rejected") return { bg: "#FEE2E2", text: "#991B1B" };
  return { bg: "#E5E7EB", text: "#374151" };
}

function getStampInfo(status) {
  const s = status?.toLowerCase();
  if (s === "rejected" || s === "failed") {
    return { text: "REJECTED", color: "#DC2626", borderColor: "#EF4444" };
  }
  if (s === "pending") {
    return { text: "PENDING", color: "#D97706", borderColor: "#F59E0B" };
  }
  return { text: "PAID", color: "#9603F8", borderColor: "#9603F8" };
}

function formatCurrency(amount) {
  return `BDT ${Number(amount).toLocaleString("en-BD")}`;
}

function generateDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Main Document ─────────────────────────────────────────────────────────────
const FeeReceiptPDF = ({ payment }) => {
  const {
    id = "—",
    trxId = "—",
    studentName = "—",
    guardianName = "—",
    class: studentClass = "—",
    amount = 0,
    method = "—",
    date = "—",
    feeType = "Fee Payment",
    status = "Successful",
    section = "",
    roll = "",
    semester = "Spring Term 2026",
    schoolName = "PaymentTrack Academy",
    schoolAddress = "Dhanmondi, Dhaka, Bangladesh",
    adminName = "System Administrator",
  } = payment;

  const statusColors = getStatusColors(status);
  const stampInfo = getStampInfo(status);
  const lineItems = [{ description: feeType, amount }];
  const subtotal = lineItems.reduce((s, i) => s + Number(i.amount), 0);
  const statusLower = status.toLowerCase();
  const isRejected = statusLower === "rejected" || statusLower === "failed";
  const isPending = statusLower === "pending";

  return (
    <Document
      title={`Fee Receipt - ${trxId}`}
      author="PaymentTrack"
      subject="Student Fee Receipt"
      creator="PaymentTrack System"
    >
      <Page size="A4" style={styles.page}>

        {/* ── Header ── */}
        <View style={styles.headerBand}>
          <View style={styles.brandCol}>
            <Text style={styles.brandName}>PaymentTrack</Text>
            <Text style={styles.brandTagline}>
              OFFICIAL FEE RECEIPT  ·  {schoolName.toUpperCase()}
            </Text>
          </View>
          <View style={styles.receiptBadge}>
            <Text style={styles.receiptBadgeLabel}>RECEIPT</Text>
            <Text style={styles.receiptBadgeId}>{id}</Text>
          </View>
        </View>

        {/* ── Sub-header ── */}
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Transaction ID: {trxId}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            {/* Student Info */}
            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>STUDENT INFORMATION</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Student Name</Text>
                <Text style={styles.infoValue}>{studentName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Class</Text>
                <Text style={styles.infoValue}>
                  {studentClass}
                  {section ? `  –  Section ${section}` : ""}
                </Text>
              </View>
              {roll ? (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Roll Number</Text>
                  <Text style={styles.infoValue}>{roll}</Text>
                </View>
              ) : null}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Guardian</Text>
                <Text style={styles.infoValue}>{guardianName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Semester</Text>
                <Text style={styles.infoValue}>{semester}</Text>
              </View>
            </View>

            {/* Payment Info with localized dynamic stamp */}
            <View style={styles.infoCard}>
              <View style={styles.cardStampContainer}>
                <View style={[styles.cardStampInner, { borderColor: stampInfo.borderColor }]}>
                  <Text style={[styles.cardStampText, { color: stampInfo.color }]}>
                    {stampInfo.text}
                  </Text>
                </View>
              </View>

              <Text style={styles.infoCardTitle}>PAYMENT INFORMATION</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date & Time</Text>
                <Text style={styles.infoValue}>{date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment Method</Text>
                <Text style={styles.infoValue}>{method}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoValue}>{status}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Institution</Text>
                <Text style={styles.infoValue}>{schoolName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{schoolAddress}</Text>
              </View>
            </View>
          </View>

          {/* Fee Breakdown Table */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>FEE BREAKDOWN</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colDescription]}>Description</Text>
              <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount (BDT)</Text>
            </View>
            {lineItems.map((item, idx) => (
              <View
                key={idx}
                style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
              >
                <Text style={[styles.tableCell, styles.colDescription]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCellBold, styles.colAmount]}>
                  {Number(item.amount).toLocaleString("en-BD")}
                </Text>
              </View>
            ))}
            <View style={[
              styles.totalBar,
              isRejected ? { backgroundColor: "#FEE2E2" } : isPending ? { backgroundColor: "#FEF3C7" } : {}
            ]}>
              <Text style={[
                styles.totalLabel,
                isRejected ? { color: "#991B1B" } : isPending ? { color: "#92400E" } : {}
              ]}>
                {isRejected ? "Total Amount (Rejected)" : isPending ? "Total Amount (Pending)" : "Total Amount Paid"}
              </Text>
              <Text style={[
                styles.totalAmount,
                isRejected ? { color: "#DC2626" } : isPending ? { color: "#D97706" } : {}
              ]}>{formatCurrency(subtotal)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Payment Method Cards */}
          <View style={styles.paymentMethod}>
            <View style={styles.methodCard}>
              <View style={styles.methodDot} />
              <View>
                <Text style={styles.methodLabel}>PAYMENT VIA</Text>
                <Text style={styles.methodValue}>{method}</Text>
              </View>
            </View>
            <View style={styles.methodCard}>
              <View style={[
                styles.methodDot,
                { backgroundColor: isRejected ? "#EF4444" : isPending ? "#F59E0B" : "#10B981" }
              ]} />
              <View>
                <Text style={styles.methodLabel}>
                  {isRejected ? "AMOUNT REJECTED" : isPending ? "AMOUNT PENDING" : "AMOUNT RECEIVED"}
                </Text>
                <Text style={[
                  styles.methodValue,
                  { color: isRejected ? "#991B1B" : isPending ? "#92400E" : "#065F46" }
                ]}>
                  {formatCurrency(subtotal)}
                </Text>
              </View>
            </View>
            <View style={styles.methodCard}>
              <View style={[styles.methodDot, { backgroundColor: "#F59E0B" }]} />
              <View>
                <Text style={styles.methodLabel}>VERIFIED BY</Text>
                <Text style={styles.methodValue}>{adminName}</Text>
              </View>
            </View>
          </View>

          {/* Important Note */}
          <View
            style={{
              backgroundColor: isRejected ? "#FEE2E2" : isPending ? "#FEF3C7" : "#F3E8FF",
              borderRadius: 6,
              padding: 10,
              borderLeftWidth: 3,
              borderLeftColor: isRejected ? "#EF4444" : isPending ? "#F59E0B" : "#9603F8",
            }}
          >
            <Text
              style={{
                fontSize: 7,
                color: isRejected ? "#991B1B" : isPending ? "#92400E" : "#5B21B6",
                fontFamily: "Helvetica-Bold",
                marginBottom: 3,
              }}
            >
              IMPORTANT NOTE
            </Text>
            <Text style={{ fontSize: 7.5, color: isRejected ? "#7F1D1D" : isPending ? "#78350F" : "#6D28D9", lineHeight: 1.5 }}>
              {isRejected
                ? `Notice: This payment transaction (${id}) was REJECTED by the accounts department. Please contact support or resubmit valid payment proof.`
                : isPending
                ? `Notice: This payment transaction (${id}) is pending administrative verification. Status will update once reviewed.`
                : `This is an official digital receipt generated by the PaymentTrack system. Please retain this document for your records. For any discrepancies, contact the accounts department with your Receipt ID: ${id}.`}
            </Text>
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerBrand}>
              PaymentTrack  ·  {schoolName}
            </Text>
            <Text style={styles.footerNote}>{schoolAddress}</Text>
            <Text style={styles.footerNote}>
              This receipt is system-generated and requires no physical signature.
            </Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={[
              styles.authorizedText,
              isRejected ? { color: "#DC2626" } : isPending ? { color: "#D97706" } : {}
            ]}>
              {isRejected ? "REJECTED RECORD" : isPending ? "PENDING VERIFICATION" : "AUTHORIZED RECEIPT"}
            </Text>
            <Text style={styles.footerDate}>Generated: {generateDate()}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FeeReceiptPDF;
