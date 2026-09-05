import { useState } from "react";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { Download, Eye, Loader2, FileText } from "lucide-react";
import FeeReceiptPDF from "./FeeReceiptPDF";

// ─── Download Button ───────────────────────────────────────────────────────────
// Wraps PDFDownloadLink from @react-pdf/renderer and provides a styled,
// animated download trigger that matches the PaymentTrack design system.
const DownloadReceiptButton = ({
  payment,
  variant = "default", // "default" | "compact" | "icon"
  className = "",
}) => {
  const fileName = `receipt-${payment?.trxId || payment?.id || "payment"}.pdf`;

  if (variant === "icon") {
    return (
      <PDFDownloadLink
        document={<FeeReceiptPDF payment={payment} />}
        fileName={fileName}
      >
        {({ loading }) => (
          <button
            title="Download PDF Receipt"
            className={`p-2 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-200 hover:scale-105 ${className}`}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </button>
        )}
      </PDFDownloadLink>
    );
  }

  if (variant === "compact") {
    return (
      <PDFDownloadLink
        document={<FeeReceiptPDF payment={payment} />}
        fileName={fileName}
      >
        {({ loading }) => (
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-all duration-200 border border-purple-200 dark:border-purple-800/50 ${className}`}
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Download className="h-3 w-3" />
            )}
            {loading ? "Generating…" : "PDF"}
          </button>
        )}
      </PDFDownloadLink>
    );
  }

  // Default full button
  return (
    <PDFDownloadLink
      document={<FeeReceiptPDF payment={payment} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <button
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200
            ${
              loading
                ? "bg-purple-100 dark:bg-purple-950/40 text-purple-400 cursor-not-allowed"
                : "bg-[#9603F8] text-white hover:bg-[#7805F5] hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0"
            } ${className}`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating PDF…</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      )}
    </PDFDownloadLink>
  );
};

// ─── Preview Button ────────────────────────────────────────────────────────────
// Opens the PDF in a new browser tab for preview before downloading.
export const PreviewReceiptButton = ({ payment, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BlobProvider document={<FeeReceiptPDF payment={payment} />}>
      {({ url, loading }) => (
        <button
          onClick={() => {
            if (url) window.open(url, "_blank", "noopener,noreferrer");
          }}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200
            border-2 border-[#9603F8] text-[#9603F8] hover:bg-[#9603F8] hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0
            ${className}`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading Preview…</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Preview Receipt</span>
            </>
          )}
        </button>
      )}
    </BlobProvider>
  );
};

// ─── Receipt Action Group ──────────────────────────────────────────────────────
// Combines both preview + download in a flex row. Use this in tables / cards.
export const ReceiptActions = ({ payment, showLabel = true }) => (
  <div className="flex items-center gap-2">
    <BlobProvider document={<FeeReceiptPDF payment={payment} />}>
      {({ url, loading }) => (
        <button
          onClick={() => url && window.open(url, "_blank", "noopener,noreferrer")}
          disabled={loading}
          title="Preview PDF"
          className="p-2 rounded-xl border border-purple-200 dark:border-purple-800/50 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-200 hover:scale-105 hover:border-purple-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      )}
    </BlobProvider>
    <PDFDownloadLink
      document={<FeeReceiptPDF payment={payment} />}
      fileName={`receipt-${payment?.trxId || payment?.id}.pdf`}
    >
      {({ loading }) => (
        <button
          title="Download PDF"
          className="p-2 rounded-xl border border-purple-200 dark:border-purple-800/50 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-200 hover:scale-105 hover:border-purple-600 disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </button>
      )}
    </PDFDownloadLink>
    {showLabel && (
      <span className="text-xs text-base-content/50 hidden sm:block">
        <FileText className="h-3 w-3 inline mr-1" />
        PDF
      </span>
    )}
  </div>
);

export default DownloadReceiptButton;
