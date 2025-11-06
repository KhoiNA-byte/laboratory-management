// src/modules/testorder/TestResultDetailPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Comments, { CommentItem } from "./CommentsPage";

/* ------------- Types ------------- */
type ParamRow = {
  parameter: string;
  result: string;
  unit: string;
  referenceRange: string;
  deviation?: string;
  flag?: "High" | "Low" | "Normal" | "Critical";
  appliedEvaluate?: string;
};

type OrderData = {
  patientName: string;
  sex: string;
  collected: string;
  instrument: string;
  criticalCount: number;
  rows: ParamRow[];
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: CommentItem[];
};

/* ------------- Mock DB ------------- */
const MOCK_DATA: Record<string, OrderData> = {
  "TO-2025-005": {
    patientName: "Tran Gia Huy",
    sex: "Female",
    collected: "2025-01-13 08:35",
    instrument: "Cobas 311",
    criticalCount: 2,
    rows: [
      {
        parameter: "WBC",
        result: "12,000",
        unit: "cells/µL",
        referenceRange: "4,000–10,000",
        deviation: "+20%",
        flag: "High",
        appliedEvaluate: "High-v2",
      },
      {
        parameter: "HGB",
        result: "14.1",
        unit: "g/dL",
        referenceRange: "14–18",
        deviation: "-1%",
        flag: "Normal",
        appliedEvaluate: "-",
      },
      {
        parameter: "HCT",
        result: "45",
        unit: "%",
        referenceRange: "42–52",
        flag: "High",
        appliedEvaluate: "High-v1",
      },
      {
        parameter: "PLT",
        result: "100,000",
        unit: "cells/µL",
        referenceRange: "150,000–350,000",
        flag: "Low",
        appliedEvaluate: "Low-v1",
      },
      {
        parameter: "MCV",
        result: "92",
        unit: "fL",
        referenceRange: "80–100",
        flag: "Normal",
      },
      {
        parameter: "RBC",
        result: "4.85",
        unit: "million/µL",
        referenceRange: "4.2–5.4",
        deviation: "-1%",
        flag: "Normal",
      },
      {
        parameter: "MCH",
        result: "30",
        unit: "pg",
        referenceRange: "27–33",
        deviation: "-1%",
        flag: "Normal",
      },
      {
        parameter: "MCHC",
        result: "33",
        unit: "g/dL",
        referenceRange: "32–36",
        deviation: "+4%",
        flag: "Normal",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Dr. Sarah Johnson",
        authorInitials: "SJ",
        role: "Clinician",
        text: "Retest MCHC — possible analyzer drift. Recollect sample if clinically indicated.",
        createdAt: "2025-01-13T15:30:00.000Z",
      },
      {
        id: "c2",
        author: "Lab Tech - Ronaldo",
        authorInitials: "LT",
        role: "Lab Tech",
        text: "Checked controls; analyzer within range. Sending for clinician review.",
        createdAt: "2025-01-13T15:45:00.000Z",
      },
    ],
  },
};

const structuredCloneSafe = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

const FlagDot: React.FC<{ flag?: ParamRow["flag"] }> = ({ flag }) => {
  if (flag === "High")
    return <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />;
  if (flag === "Low")
    return <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />;
  if (flag === "Critical")
    return <span className="h-3 w-3 rounded-full bg-red-700 inline-block" />;
  return <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />;
};

function getCurrentUserName(): string {
  try {
    const keys = ["currentUser", "user", "authUser", "userInfo", "auth"];
    for (const k of keys) {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      try {
        const obj = JSON.parse(raw);
        if (!obj) continue;
        if (typeof obj === "string" && obj.trim()) return obj;
        if (obj.name) return obj.name;
        if (obj.fullName) return obj.fullName;
        if (obj.username) return obj.username;
        if (obj.displayName) return obj.displayName;
      } catch {
        if (raw.trim()) return raw;
      }
    }
  } catch {}
  return "Admin User";
}

export default function TestResultDetailPage(): JSX.Element {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState<OrderData | undefined>(() =>
    orderNumber ? structuredCloneSafe(MOCK_DATA[orderNumber]) : undefined
  );
  const [rowsState, setRowsState] = useState<ParamRow[]>(orderData?.rows ?? []);
  const [isReviewing, setIsReviewing] = useState(false);
  const originalRowsRef = useRef<ParamRow[] | null>(null);

  const [reviewedBy, setReviewedBy] = useState<string>(
    orderData?.reviewedBy ?? "AI Auto Review"
  );
  const [reviewedAt, setReviewedAt] = useState<string | undefined>(
    orderData?.reviewedAt
  );

  const [comments, setComments] = useState<CommentItem[]>(
    orderData?.comments ? structuredCloneSafe(orderData.comments) : []
  );
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  useEffect(() => {
    if (!orderNumber) {
      navigate(-1);
      return;
    }
    const data = MOCK_DATA[orderNumber];
    setOrderData(data ? structuredCloneSafe(data) : undefined);
    setRowsState(data ? structuredCloneSafe(data.rows) : []);
    setComments(data?.comments ? structuredCloneSafe(data.comments) : []);
    setReviewedBy(data?.reviewedBy ?? "AI Auto Review");
    setReviewedAt(data?.reviewedAt);
    setIsReviewing(false);
    originalRowsRef.current = null;
  }, [orderNumber, navigate]);

  if (!orderNumber || !orderData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Result not found</h3>
          <p className="text-sm text-gray-600 mb-6">
            Cannot find test result {orderNumber}
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Review logic ---------- */
  const handleStartReview = () => {
    originalRowsRef.current = structuredCloneSafe(rowsState);
    setIsReviewing(true);
  };
  const handleCancelReview = () => {
    if (originalRowsRef.current)
      setRowsState(structuredCloneSafe(originalRowsRef.current));
    originalRowsRef.current = null;
    setIsReviewing(false);
  };
  const handleSaveReview = () => {
    if (orderNumber) {
      MOCK_DATA[orderNumber].rows = structuredCloneSafe(rowsState);
      const currentUser = getCurrentUserName();
      const now = new Date().toISOString();
      MOCK_DATA[orderNumber].reviewedBy = currentUser;
      MOCK_DATA[orderNumber].reviewedAt = now;
      setOrderData((d) =>
        d
          ? {
              ...d,
              rows: structuredCloneSafe(rowsState),
              reviewedBy: currentUser,
              reviewedAt: now,
            }
          : d
      );
      setReviewedBy(currentUser);
      setReviewedAt(now);
    }
    originalRowsRef.current = null;
    setIsReviewing(false);
    alert("Saved review changes (mock).");
  };

  const handleFieldChange = (
    index: number,
    field: keyof ParamRow,
    value: string
  ) => {
    setRowsState((prev) => {
      const copy = prev.map((r) => ({ ...r }));
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleReview = () => {
    if (isReviewing) handleSaveReview();
    else handleStartReview();
  };
  const handleDownloadPdf = () => alert("Downloading PDF (placeholder)");
  const handleViewHL7 = () => alert("View Raw HL7 (placeholder)");

  /* ---------- Comments popup controls ---------- */
  const openComments = () => setIsCommentsOpen(true);
  const closeComments = () => setIsCommentsOpen(false);
  const onChangeComments = (newComments: CommentItem[]) => {
    setComments(newComments);
    if (orderNumber)
      MOCK_DATA[orderNumber].comments = structuredCloneSafe(newComments);
  };

  const latestComment =
    comments.length === 0
      ? null
      : comments
          .slice()
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0];
  const previewText = latestComment
    ? `(${latestComment.author}) ${latestComment.text}`
    : "Empty";

  const total = rowsState.length;
  const normal = rowsState.filter((r) => !r.flag || r.flag === "Normal").length;
  const high = rowsState.filter((r) => r.flag === "High").length;
  const low = rowsState.filter((r) => r.flag === "Low").length;

  return (
    <div>
      {/* Nếu comments mở -> ẩn modal chính (render only comments) */}
      {!isCommentsOpen && (
        <>
          {/* backdrop (kích thước cố định) */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
            onClick={() => {
              if (isReviewing) {
                handleCancelReview();
                return;
              }
              navigate(-1);
            }}
          />

          {/* Modal: responsive, column on small screens, row on md+ */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-[1100px] mx-auto overflow-hidden
                            flex flex-col h-[calc(100vh-4rem)] md:h-auto"
            >
              {/* Header area */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  {/* Left: Title and Patient Info */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Complete Blood Count (CBC)
                    </h2>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{orderData.patientName}</div>
                      <div>{orderNumber}</div>
                      <div>Sex: {orderData.sex}</div>
                    </div>
                  </div>
                  {/* Right: Collected and Instrument */}
                  <div className="text-right text-sm text-gray-600 space-y-1">
                    <div>Collected: {orderData.collected}</div>
                    <div>Instrument: {orderData.instrument}</div>
                  </div>
                </div>
              </div>

              {/* Main content: make scrollable while footer fixed */}
              <div className="flex-1 overflow-auto p-6">
                {/* inner layout switches to column on small screens */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: table - allow its own internal scrolling if needed */}
                  <div className="flex-1 min-w-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-sm text-gray-500 border-b border-gray-200">
                            <th className="py-3 pr-6 font-medium">Parameter</th>
                            <th className="py-3 pr-6 font-medium">Result</th>
                            <th className="py-3 pr-6 font-medium">Unit</th>
                            <th className="py-3 pr-6 font-medium">Reference range</th>
                            <th className="py-3 pr-6 font-medium">Deviation</th>
                            <th className="py-3 pr-6 font-medium">Flag</th>
                            <th className="py-3 pr-6 font-medium">Applied Rule</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rowsState.map((r, idx) => {
                            const isHigh = r.flag === "High" || r.flag === "Critical";
                            const isLow = r.flag === "Low";
                            const isHighlighted = isHigh || isLow;
                            return (
                              <tr
                                key={r.parameter}
                                className="align-top border-b border-gray-100"
                              >
                                <td className="py-4 pr-6 font-semibold text-gray-700">
                                  {r.parameter}
                                </td>

                                <td className="py-4 pr-6">
                                  {isReviewing ? (
                                    <input
                                      type="text"
                                      value={r.result}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          idx,
                                          "result",
                                          e.target.value
                                        )
                                      }
                                      className="w-36 px-2 py-1 border rounded text-sm"
                                    />
                                  ) : (
                                    <span
                                      className={`font-semibold ${
                                        isHigh
                                          ? "text-red-600"
                                          : isLow
                                          ? "text-orange-600"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {r.result}
                                    </span>
                                  )}
                                </td>

                                <td className="py-4 pr-6 text-sm text-gray-600">
                                  {r.unit}
                                </td>
                                <td className="py-4 pr-6 text-sm text-gray-600">
                                  {r.referenceRange}
                                </td>

                                <td className="py-4 pr-6 text-sm text-gray-600">
                                  {isReviewing ? (
                                    <input
                                      type="text"
                                      value={r.deviation ?? ""}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          idx,
                                          "deviation",
                                          e.target.value
                                        )
                                      }
                                      className="w-28 px-2 py-1 border rounded text-sm"
                                      placeholder="-"
                                    />
                                  ) : (
                                    r.deviation ?? "-"
                                  )}
                                </td>

                                <td className="py-4 pr-6">
                                  <div className="flex items-center gap-2">
                                    <FlagDot flag={r.flag} />
                                    <span className="text-sm text-gray-600">
                                      {r.flag ?? "Normal"}
                                    </span>
                                  </div>
                                </td>

                                <td className="py-4 pr-6 text-sm text-gray-600">
                                  {isReviewing ? (
                                    <input
                                      type="text"
                                      value={r.appliedEvaluate ?? ""}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          idx,
                                          "appliedEvaluate",
                                          e.target.value
                                        )
                                      }
                                      className="w-40 px-2 py-1 border rounded text-sm"
                                      placeholder="-"
                                    />
                                  ) : (
                                    r.appliedEvaluate ?? "-"
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Comment section below table */}
                    <div className="mt-6 text-sm text-gray-700">
                      <div className="mb-2">
                        <strong>Comment:</strong> {latestComment ? latestComment.text : "Retest MCHC"}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openComments();
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        More comment
                      </button>
                    </div>
                  </div>

                  {/* Right: summary & actions - on small screens it goes under the table */}
                  <div className="w-full md:w-[320px] flex-shrink-0 relative">
                    {/* Badge Critical Values at top right */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="inline-block bg-red-600 text-white text-xs font-medium px-3 py-1 rounded">
                        {orderData.criticalCount} Critical Values
                      </span>
                    </div>
                    
                    <div className="space-y-4 bg-white rounded-lg shadow-md p-4 border">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Summary
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li className="flex justify-between">
                            <span>Total tests</span>
                            <strong className="text-gray-900">{total}</strong>
                          </li>
                          <li className="flex justify-between">
                            <span>Normal</span>
                            <strong className="text-gray-900">{normal}</strong>
                          </li>
                          <li className="flex justify-between">
                            <span>High</span>
                            <strong className="text-gray-900">{high}</strong>
                          </li>
                          <li className="flex justify-between">
                            <span>Low</span>
                            <strong className="text-gray-900">{low}</strong>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Reviewed
                        </h4>
                        <div className="text-sm text-gray-600 mb-1">By</div>
                        <div className="text-sm font-medium text-blue-600">
                          {reviewedBy}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Actions
                        </h4>
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={handleDownloadPdf}
                            className="w-full text-left px-0 py-1 text-sm text-gray-600 hover:text-gray-900"
                          >
                            Download PDF
                          </button>
                          <button
                            type="button"
                            onClick={() => alert("Request Reprocess (placeholder)")}
                            className="w-full text-left px-0 py-1 text-sm text-gray-600 hover:text-gray-900"
                          >
                            Request Reprocess
                          </button>
                          <button
                            type="button"
                            onClick={handleViewHL7}
                            className="w-full text-left px-0 py-1 text-sm text-gray-600 hover:text-gray-900"
                          >
                            View Raw HL7
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer fixed at bottom of modal */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    if (isReviewing) handleCancelReview();
                    else navigate(-1);
                  }}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>

                <button
                  onClick={handleReview}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isReviewing
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isReviewing ? "Save" : "Review"}
                </button>
              </div>

              {/* Close icon (absolute inside modal) */}
              <button
                onClick={() => {
                  if (isReviewing) handleCancelReview();
                  else navigate(-1);
                }}
                aria-label="Close"
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:bg-gray-50"
              >
                <XMarkIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Comments modal only rendered when open (so main modal is effectively hidden) */}
      {isCommentsOpen && orderNumber && (
        <Comments
          orderNumber={orderNumber}
          initialComments={comments}
          onClose={() => setIsCommentsOpen(false)}
          onChangeComments={(c) => onChangeComments(c)}
        />
      )}
    </div>
  );
}
