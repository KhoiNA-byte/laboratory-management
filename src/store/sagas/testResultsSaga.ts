// src/store/sagas/testResultsSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchListRequest,
  fetchListSuccess,
  fetchListFailure,
  runTestRequest,
  runTestSuccess,
  runTestFailure,
  fetchDetailRequest,
  fetchDetailSuccess,
  fetchDetailFailure,
  updateCommentsRequest,
  updateCommentsSuccess,
  updateCommentsFailure,
  deleteResultRequest,
  deleteResultSuccess,
  deleteResultFailure,
  TestResultRow,
  ListRow,
  CommentItem,
} from "../slices/testResultsSlice";
import { API_BASE_URL } from "../../services/apiConfig";

const sid = (v: any) => (v === null || v === undefined ? "" : String(v));

function generateRunId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return String(crypto.randomUUID());
    }
  } catch {}
  return `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildHL7(
  runId: string,
  order: any,
  instrumentName: string,
  rows: any[],
  patientDob?: string
) {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  const patientName = order?.patientName ?? order?.patient_name ?? "Unknown";
  const pidId =
    order?.patient_id ?? order?.id ?? `P${Date.now().toString().slice(-6)}`;
  const nameParts = String(patientName).split(" ");
  const family = nameParts.length > 0 ? nameParts[0] : patientName;
  const given = nameParts.length > 1 ? nameParts.slice(1).join("^") : "";

  const msh = `MSH|^~\\&|LIS|LAB|HIS|HOSPITAL|${ts}||ORU^R01|${runId}|P|2.5`;
  const pid = `PID|1||${pidId}^^^Hospital^MR||${
    given ? `${given}^${family}` : patientName
  }||${patientDob ?? ""}|${order?.sex?.charAt(0) ?? "U"}|||${
    order?.address ?? ""
  }`;
  const obr = `OBR|1|ORD${runId.slice(0, 8)}|RES${runId.slice(
    0,
    8
  )}|CBC^Complete Blood Count^L||${ts}|||||${order?.requester ?? ""}`;

  const obxLines = rows.map((r: any, idx: number) => {
    const seq = idx + 1;
    const code = `${r.parameter}^${r.parameter}^L`;
    const val = String(r.result);
    const unit = r.unit ?? "";
    const ref = (r.referenceRange || "").replace(/,/g, "");
    const flagMap: any = { High: "H", Low: "L", Normal: "N", Critical: "C" };
    const singleFlag = flagMap[r.flag] ?? (r.flag ? r.flag.charAt(0) : "");
    const deviation = r.deviation ?? "";
    const applied = r.appliedEvaluate ?? "";
    return `OBX|${seq}|NM|${code}||${val}|${unit}|${ref}|${singleFlag}|${deviation}|F||${applied}`;
  });

  const nte = `NTE|1||Some parameters flagged high/low — please review applied rules.`;

  const parts = [msh, pid, obr, ...obxLines, nte];
  return parts.join("\n");
}
async function resolveUserNameAsync(
  uidRaw: any,
  userMap: Record<string, string>,
  usersArray: any[] | null = null
): Promise<string | null> {
  if (uidRaw === null || uidRaw === undefined) return null;
  const uid = String(uidRaw);
  if (!uid) return null;

  if (userMap[uid]) return userMap[uid];

  if (Array.isArray(usersArray) && usersArray.length > 0) {
    const found = usersArray.find(
      (u) => String(u.userId) === uid || String(u.id) === uid
    );
    if (found?.name) {
      userMap[uid] = found.name;
      return found.name;
    }
  }

  const tryApi = async (
    url: string,
    pickName: (data: any) => string | null
  ) => {
    try {
      const res = await axios.get(url);
      return pickName(res.data);
    } catch {
      return null;
    }
  };

  // API /user?userId=...
  let name = await tryApi(
    `${API_BASE_URL}/user?userId=${encodeURIComponent(uid)}`,
    (data) => (Array.isArray(data) && data[0]?.name ? data[0].name : null)
  );
  if (name) return (userMap[uid] = name);

  //  /user/:uid
  name = await tryApi(
    `${API_BASE_URL}/user/${encodeURIComponent(uid)}`,
    (data) => data?.name ?? null
  );
  if (name) return (userMap[uid] = name);

  //  API /user (all) and find uid
  name = await tryApi(`${API_BASE_URL}/user`, (data) => {
    if (Array.isArray(data)) {
      const f = data.find(
        (u) => String(u.userId) === uid || String(u.id) === uid
      );
      return f?.name ?? null;
    }
    return null;
  });
  if (name) return (userMap[uid] = name);

  return null;
}

function extractUserName(u: any) {
  if (!u) return null;
  return (
    u.name ?? u.fullName ?? u.full_name ?? u.displayName ?? u.display ?? null
  );
}

async function fetchAllOrdersAsync(): Promise<any[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/test_orders`);
    if (Array.isArray(res?.data)) return res.data;
  } catch {}
  try {
    const ures = await axios.get(`${API_BASE_URL}/user`);
    const users: any[] = ures?.data ?? [];
    const allOrders: any[] = [];
    for (const u of users) {
      const uid = u?.userId ?? u?.id;
      if (!uid) continue;
      try {
        const tor = await axios.get(
          `${API_BASE_URL}/user/${encodeURIComponent(uid)}/test_orders`
        );
        if (Array.isArray(tor?.data)) {
          const withOwner = tor.data.map((o: any) => ({
            ...o,
            ownerUserId: uid,
          }));
          allOrders.push(...withOwner);
        }
      } catch {}
    }
    return allOrders;
  } catch {
    return [];
  }
}

async function findOrderByIdAsync(orderId: any): Promise<any | null> {
  if (orderId === null || orderId === undefined) return null;
  const idStr = String(orderId);

  // try direct
  try {
    const r = await axios.get(
      `${API_BASE_URL}/test_orders/${encodeURIComponent(idStr)}`
    );
    if (r?.data) return r.data;
  } catch {}

  try {
    const q = await axios.get(
      `${API_BASE_URL}/test_orders?id=${encodeURIComponent(idStr)}`
    );
    const arr = q?.data ?? [];
    if (Array.isArray(arr) && arr.length > 0) return arr[0];
  } catch {}

  try {
    const ures = await axios.get(`${API_BASE_URL}/user`);
    const users: any[] = ures?.data ?? [];
    for (const u of users) {
      const uid = u?.userId ?? u?.id;
      if (!uid) continue;
      try {
        const direct = await axios.get(
          `${API_BASE_URL}/user/${encodeURIComponent(
            uid
          )}/test_orders/${encodeURIComponent(idStr)}`
        );
        if (direct?.data) {
          return { ...direct.data, ownerUserId: uid };
        }
      } catch {
        try {
          const list = await axios.get(
            `${API_BASE_URL}/user/${encodeURIComponent(uid)}/test_orders`
          );
          const arr = list?.data ?? [];
          const found = (arr || []).find((x: any) => String(x.id) === idStr);
          if (found) return { ...found, ownerUserId: uid };
        } catch {}
      }
    }
  } catch {}

  try {
    const t = await axios.get(`${API_BASE_URL}/test_orders`);
    const arr = t?.data ?? [];
    const f = (arr || []).find((x: any) => String(x.id) === idStr);
    if (f) return f;
  } catch {}

  return null;
}

function parseRange(s?: string): { low: number; high: number } | null {
  if (!s || typeof s !== "string") return null;
  const parts = s.split(/–|—|-|to/).map((p) => p.trim());
  if (parts.length < 2) return null;
  const p0 = Number(parts[0].replace(/[, ]+/g, ""));
  const p1 = Number(parts[1].replace(/[, ]+/g, ""));
  if (Number.isFinite(p0) && Number.isFinite(p1)) {
    return { low: Math.min(p0, p1), high: Math.max(p0, p1) };
  }
  return null;
}

function randBetweenLocal(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function formatResult(key: string, v: number) {
  const k = String(key).toLowerCase();
  if (k.includes("wbc") || k.includes("plt"))
    return Math.round(v).toLocaleString();
  if (k.includes("rbc")) return (Math.round(v * 100) / 100).toFixed(2);
  if (k.includes("hgb")) return (Math.round(v * 10) / 10).toFixed(1);
  if (k.includes("hct")) return Math.round(v).toString();
  if (k.includes("mcv") || k.includes("mch") || k.includes("mchc"))
    return Math.round(v).toString();
  return String(v);
}

/** ------------------ fetchListSaga ------------------ */
export function* fetchListSaga(): Generator<any, void, any> {
  try {
    const resultsRes = yield call(axios.get, `${API_BASE_URL}/test_results`);
    const results: any[] = resultsRes?.data ?? [];

    let users: any[] = [];
    try {
      const usersRes = yield call(axios.get, `${API_BASE_URL}/user`);
      users = usersRes?.data ?? [];
    } catch {
      users = [];
    }

    let orders: any[] = [];
    try {
      orders = yield call(fetchAllOrdersAsync);
    } catch {
      orders = [];
    }

    const userMap: Record<string, string> = {};
    for (const u of users) {
      const uid = u?.userId ?? u?.id ?? null;
      const name =
        u && typeof u.name === "string" && u.name.trim()
          ? u.name
          : extractUserName(u) ?? "";
      if (uid != null) userMap[String(uid)] = name;
    }

    const inProcessRows: ListRow[] = [];
    for (const o of orders || []) {
      const hasNoRun =
        o.run_id === undefined ||
        o.run_id === null ||
        String(o.run_id).trim() === "";
      if (!hasNoRun) continue;
      const dateRaw = o.created_at ?? o.createdAt ?? "";
      const date = dateRaw ? new Date(dateRaw).toLocaleString() : "";

      let patientName =
        o.patientName ??
        o.patient_name ??
        (o.userId ? userMap[String(o.userId)] : undefined) ??
        "Unknown";

      if (
        (patientName === "Unknown" || !patientName) &&
        (o.userId || o.user_id)
      ) {
        try {
          const nameResolved: string | null = yield call(
            resolveUserNameAsync,
            o.userId ?? o.user_id,
            userMap,
            users
          );
          if (nameResolved) patientName = nameResolved;
        } catch {}
      }

      let tester =
        (o.userId ? userMap[String(o.userId)] : undefined) ??
        o.requester ??
        o.runByUserId ??
        "Admin";

      if (
        (tester === "Admin" || !tester) &&
        (o.runByUserId || o.createdBy || o.created_by)
      ) {
        try {
          const maybe = o.runByUserId ?? o.createdBy ?? o.created_by;
          const tname: string | null = yield call(
            resolveUserNameAsync,
            maybe,
            userMap,
            users
          );
          if (tname) tester = tname;
        } catch {}
      }

      inProcessRows.push({
        id: String(o.id),
        patientName,
        date,
        tester,
        status: "In Progress",
        source: "order",
        runId: "",
      });
    }

    const completedRows: ListRow[] = [];
    const completedResults = (results || []).filter(
      (r) => String(r.status).toLowerCase() === "completed"
    );
    for (const r of completedResults) {
      const matchedOrder = (orders || []).find(
        (o) => o.run_id && r.run_id && String(o.run_id) === String(r.run_id)
      );
      const dateRaw =
        r.performed_at ??
        r.created_at ??
        r.createdAt ??
        (matchedOrder ? matchedOrder.created_at ?? matchedOrder.createdAt : "");
      const date = dateRaw ? new Date(dateRaw).toLocaleString() : "";

      let patientName =
        matchedOrder?.patientName ??
        matchedOrder?.patient_name ??
        r.patientName ??
        r.patient_name ??
        (matchedOrder && matchedOrder.userId
          ? userMap[String(matchedOrder.userId)]
          : undefined) ??
        (r.userId ? userMap[String(r.userId)] : undefined) ??
        "Unknown";

      if (
        (patientName === "Unknown" || !patientName) &&
        matchedOrder &&
        (matchedOrder.userId || matchedOrder.user_id)
      ) {
        try {
          const nameResolved: string | null = yield call(
            resolveUserNameAsync,
            matchedOrder.userId ?? matchedOrder.user_id,
            userMap,
            users
          );
          if (nameResolved) patientName = nameResolved;
        } catch {}
      }

      if (
        (patientName === "Unknown" || !patientName) &&
        (r.userId || r.user_id)
      ) {
        try {
          const nameResolved2: string | null = yield call(
            resolveUserNameAsync,
            r.userId ?? r.user_id,
            userMap,
            users
          );
          if (nameResolved2) patientName = nameResolved2;
        } catch {}
      }

      let tester =
        (r.userId ? userMap[String(r.userId)] : undefined) ??
        r.requester ??
        r.tester ??
        "Admin";

      if (
        (tester === "Admin" || !tester) &&
        (r.runByUserId || r.createdBy || r.created_by)
      ) {
        try {
          const maybe = r.runByUserId ?? r.createdBy ?? r.created_by;
          const tname: string | null = yield call(
            resolveUserNameAsync,
            maybe,
            userMap,
            users
          );
          if (tname) tester = tname;
        } catch {}
      }

      completedRows.push({
        id: matchedOrder ? String(matchedOrder.id) : String(r.id ?? ""),
        patientName,
        date,
        tester,
        status: "Completed",
        source: "result",
        runId: r.run_id ? String(r.run_id) : "",
      });
    }

    const completedIds = new Set(completedRows.map((c) => c.id));
    const finalRows: ListRow[] = [
      ...inProcessRows.filter((r) => !completedIds.has(r.id)),
      ...completedRows,
    ];

    yield put(fetchListSuccess(finalRows));
  } catch (err: any) {
    yield put(fetchListFailure(err?.message ?? "Fetch list failed"));
  }
}

/** ------------------ runTestSaga ------------------ */
export function* runTestSaga(
  action: ReturnType<typeof runTestRequest>
): Generator<any, void, any> {
  const { orderId, instrumentId, sex, usedReagents } = action.payload as {
    orderId: any;
    instrumentId: any;
    sex?: any;
    usedReagents?: { id: string | number; amountUsed: number; unit?: string }[];
  };

  try {
    const order: any = yield call(findOrderByIdAsync, orderId) || {};
    if (order && order.run_id && String(order.run_id).trim() !== "") {
      throw new Error("This test order already has run_id");
    }

    const instRes = yield call(
      axios.get,
      `${API_BASE_URL}/instruments/${sid(instrumentId)}`
    );
    const inst = instRes?.data ?? {};

    let resolvedPatientName: string | null = null;
    if (order && (order.userId || order.user_id)) {
      try {
        resolvedPatientName = yield call(
          resolveUserNameAsync,
          order.userId ?? order.user_id,
          {},
          null
        );
      } catch {
        resolvedPatientName = "Unknown";
      }
    }

    let currentUserId: string | null = null;
    let currentUserName: string | null = null;
    try {
      if (typeof localStorage !== "undefined") {
        currentUserId =
          localStorage.getItem("userId") ||
          localStorage.getItem("user_id") ||
          localStorage.getItem("id") ||
          null;
        if (!currentUserId) {
          const maybeUser =
            localStorage.getItem("user") ||
            localStorage.getItem("auth") ||
            null;
          if (maybeUser) {
            try {
              const parsed = JSON.parse(maybeUser);
              currentUserId = String(
                parsed?.userId ?? parsed?.id ?? parsed?.user_id ?? currentUserId
              );
            } catch {}
          }
        }
        if (currentUserId) {
          try {
            currentUserName = yield call(
              resolveUserNameAsync,
              currentUserId,
              {},
              null
            );
          } catch {}
        }
      }
    } catch {
      currentUserId = currentUserId ?? null;
      currentUserName = null;
    }

    let PARAM_TEMPLATE: {
      key: string;
      parameter: string;
      unit: string;
      referenceRange: string;
    }[] = [];

    try {
      const res = yield call(axios.get, `${API_BASE_URL}/cbc_parameters`);
      const data = res?.data ?? [];
      if (Array.isArray(data)) {
        PARAM_TEMPLATE = data.map((d: any) => ({
          key: d.name,
          parameter: d.name,
          unit: d.unit,
          referenceRange: `${d.value_low_male}–${d.value_high_male}`, // male default
        }));
      }
    } catch (err) {
      console.error("Failed to fetch PARAM_TEMPLATE:", err);
    }

    const rowsForResult: any[] = [];
    for (const tpl of PARAM_TEMPLATE) {
      const rng = parseRange(tpl.referenceRange);
      let value: number;
      if (rng) {
        const low = rng.low;
        const high = rng.high;
        const p = Math.random();
        if (p < 0.75) {
          value = randBetweenLocal(low, high);
        } else if (p < 0.875) {
          value = randBetweenLocal(
            Math.max(0, low * 0.5),
            Math.max(0, low - (high - low) * 0.05)
          );
        } else {
          value = randBetweenLocal(
            high + Math.max(1, (high - low) * 0.01),
            high * 1.5
          );
        }
      } else {
        value = Math.round(randBetweenLocal(1, 100) * 10) / 10;
      }

      let flag = "Normal";
      let deviation = "0%";
      if (rng) {
        const low = rng.low;
        const high = rng.high;
        if (value < low) {
          flag = "Low";
          const pct = Math.round(((low - value) / (low || 1)) * 100);
          deviation = `-${pct}%`;
        } else if (value > high) {
          flag = "High";
          const pct = Math.round(((value - high) / (high || 1)) * 100);
          deviation = `+${pct}%`;
        } else {
          flag = "Normal";
          deviation = "0%";
        }
      }

      let appliedEvaluate = "-";
      if (flag === "High")
        appliedEvaluate = Math.random() < 0.5 ? "High-v1" : "High-v2";
      if (flag === "Low") appliedEvaluate = "Low-v1";

      const formatted = formatResult(tpl.key, value);

      rowsForResult.push({
        parameter: tpl.parameter,
        result: formatted,
        unit: tpl.unit,
        referenceRange: tpl.referenceRange,
        deviation,
        flag,
        appliedEvaluate,
      });
    }

    const runId = generateRunId();
    const performedAt = new Date().toISOString();
    const hl7Raw = buildHL7(
      runId,
      order,
      inst?.name ?? sid(instrumentId),
      rowsForResult,
      order?.dob
    );

    const testResultPayload: any = {
      run_id: runId,
      instrument: inst?.name ?? sid(instrumentId),
      performed_at: performedAt,
      status: "Completed",
      patientName:
        order?.patientName ??
        order?.patient_name ??
        resolvedPatientName ??
        "Unknown",
      sex: sex ?? order?.sex ?? "Unknown",
      collected: performedAt,
      criticalCount: rowsForResult.filter(
        (r) => r.flag === "High" || r.flag === "Low" || r.flag === "Critical"
      ).length,
      rows: rowsForResult,
      comments: [],
      notes: `Auto-generated (mock) for order ${sid(orderId)}`,
      hl7_raw: hl7Raw,
      runByUserId: currentUserId ?? "unknown",
      runByName: currentUserName ?? "unknown",
    };

    let trResData: any = null;
    try {
      const trRes = yield call(
        axios.post,
        `${API_BASE_URL}/test_results`,
        testResultPayload
      );
      trResData = trRes?.data ?? null;
    } catch {
      trResData = null;
    }

    let testResultId = trResData?.id ?? null;
    if (!testResultId) {
      try {
        const find = yield call(
          axios.get,
          `${API_BASE_URL}/test_results?run_id=${encodeURIComponent(runId)}`
        );
        const arr = find?.data ?? [];
        if (arr.length > 0) testResultId = arr[0].id ?? null;
      } catch {}
    }
    if (!testResultId) testResultId = `local-${Date.now()}`;

    const ownerUserId =
      order?.ownerUserId ?? order?.userId ?? order?.user_id ?? null;
    let patched = false;
    if (ownerUserId) {
      try {
        yield call(
          axios.patch,
          `${API_BASE_URL}/user/${encodeURIComponent(
            ownerUserId
          )}/test_orders/${sid(orderId)}`,
          {
            run_id: runId,
            runByUserId: currentUserId ?? "unknown",
            tester: currentUserName ?? order?.tester ?? order?.requester,
          }
        );
        patched = true;
      } catch {}
    }

    if (!patched) {
      try {
        yield call(axios.patch, `${API_BASE_URL}/test_order/${sid(orderId)}`, {
          run_id: runId,
          runByUserId: currentUserId ?? "unknown",
          tester: currentUserName ?? order?.tester ?? order?.requester,
        });
        patched = true;
      } catch {
        try {
          if (ownerUserId) {
            yield call(
              axios.put,
              `${API_BASE_URL}/user/${encodeURIComponent(
                ownerUserId
              )}/test_orders/${sid(orderId)}`,
              {
                ...(order ?? {}),
                run_id: runId,
                runByUserId: currentUserId ?? "unknown",
                tester: currentUserName ?? order?.tester ?? order?.requester,
              }
            );
            patched = true;
          } else {
            yield call(
              axios.put,
              `${API_BASE_URL}/test_orders/${sid(orderId)}`,
              {
                ...(order ?? {}),
                run_id: runId,
                runByUserId: currentUserId ?? "unknown",
                tester: currentUserName ?? order?.tester ?? order?.requester,
              }
            );
            patched = true;
          }
        } catch {}
      }
    }

    try {
      const instFull = inst;
      const reagentRefs: any[] = instFull?.supportedReagents ?? [];

      for (const rid of reagentRefs) {
        try {
          // 1) Try resolve reagent by id first, else try search-by-name
          let cur: any = null;
          if (rid !== null && rid !== undefined && String(rid).trim() !== "") {
            // try GET by id
            try {
              const rcur = yield call(
                axios.get,
                `${API_BASE_URL}/reagents/${encodeURIComponent(sid(rid))}`
              );
              cur = rcur?.data ?? null;
            } catch (err) {
              // not found by id — we'll try search by name below
              cur = null;
            }

            if (!cur) {
              // try search endpoint by name / partial match
              try {
                const searchRes = yield call(
                  axios.get,
                  `${API_BASE_URL}/reagents?search=${encodeURIComponent(
                    String(rid)
                  )}`
                );
                const arr = searchRes?.data ?? [];
                cur =
                  arr.find(
                    (a: any) =>
                      String(a.id) === String(rid) ||
                      String(a.name ?? "").toLowerCase() ===
                        String(rid).toLowerCase()
                  ) ??
                  arr[0] ??
                  null;
              } catch (err) {
                cur = null;
              }
            }
          }

          if (!cur) {
            console.warn("[runTestSaga] reagent not found for ref:", rid);
            continue;
          }

          let amountToUse = 0;
          if (Array.isArray(usedReagents) && usedReagents.length > 0) {
            const u = usedReagents.find(
              (x: any) =>
                String(x.id) === String(cur.id) ||
                String(x.id) === String(cur.name)
            );
            if (u) amountToUse = Number(u.amountUsed || 0);
          }
          if (!amountToUse) amountToUse = Number(cur.usage_per_run ?? 0);

          const currentQty = Number(cur.quantity ?? 0);
          const newQty = Math.max(0, currentQty - amountToUse);

          if (newQty === currentQty) {
            console.info(
              `[runTestSaga] reagent ${sid(
                cur.id
              )} no change in quantity (${currentQty})`
            );
            continue;
          }

          try {
            const patchRes = yield call(
              axios.patch,
              `${API_BASE_URL}/reagents/${encodeURIComponent(sid(cur.id))}`,
              { quantity: newQty }
            );
            console.info(
              `[runTestSaga] PATCH reagent ${sid(cur.id)} success`,
              patchRes?.data ?? null
            );
          } catch (errPatch: any) {
            console.warn(
              `[runTestSaga] PATCH failed for reagent ${sid(
                cur.id
              )} — trying PUT`,
              errPatch?.message ?? errPatch
            );
            try {
              const existingRes = yield call(
                axios.get,
                `${API_BASE_URL}/reagents/${encodeURIComponent(sid(cur.id))}`
              );
              const existing = existingRes?.data ?? {};
              const putPayload = { ...existing, quantity: newQty };
              const putRes = yield call(
                axios.put,
                `${API_BASE_URL}/reagents/${encodeURIComponent(sid(cur.id))}`,
                putPayload
              );
              console.info(
                `[runTestSaga] PUT reagent ${sid(cur.id)} success`,
                putRes?.data ?? null
              );
            } catch (errPut: any) {
              console.error(
                `[runTestSaga] PUT fallback failed for reagent ${sid(cur.id)}`,
                errPut?.message ?? errPut
              );
            }
          }
        } catch (singleErr) {
          console.warn(
            "[runTestSaga] single reagent update error for ref:",
            rid,
            singleErr
          );
        }
      }
    } catch (outerErr) {
      console.error("[runTestSaga] reagent update outer error:", outerErr);
    }

    try {
      const commentsPayload = {
        run_id: runId,
        comments: [],
        createdAt: new Date().toISOString(),
        runByUserId: currentUserId ?? "unknown",
        createdByName: currentUserName ?? "unknown",
      };
      yield call(axios.post, `${API_BASE_URL}/comments`, commentsPayload);
    } catch {}

    const rowsToReturn: TestResultRow[] = rowsForResult.map((r: any) => ({
      run_id: runId,
      test_result_id: testResultId,
      parameter_name: r.parameter,
      result_value: r.result,
      flag: r.flag,
      evaluate: r.appliedEvaluate,
      deviation: r.deviation,
      unit: r.unit,
    }));

    yield put(runTestSuccess({ runId, testResultId, rows: rowsToReturn }));
    yield put({ type: fetchListRequest.type });
  } catch (err: any) {
    yield put(runTestFailure(err?.message ?? "Run test failed"));
  }
}

/** ------------------ updateCommentsSaga ------------------ */
function* updateCommentsSaga(
  action: ReturnType<typeof updateCommentsRequest>
): Generator<any, void, any> {
  const { runId, comments } = action.payload as {
    runId: string;
    comments: CommentItem[];
  };
  try {
    let threadId: string | number | null = null;
    try {
      const found = yield call(
        axios.get,
        `${API_BASE_URL}/comments?run_id=${encodeURIComponent(runId)}`
      );
      const arr = found?.data ?? [];
      if (arr.length > 0) threadId = arr[0].id ?? null;
    } catch {}

    if (threadId) {
      try {
        yield call(axios.patch, `${API_BASE_URL}/comments/${sid(threadId)}`, {
          comments,
          updatedAt: new Date().toISOString(),
        });
      } catch {
        try {
          const existing =
            (yield call(axios.get, `${API_BASE_URL}/comments/${sid(threadId)}`))
              ?.data ?? {};
          yield call(axios.put, `${API_BASE_URL}/comments/${sid(threadId)}`, {
            ...existing,
            comments,
            updatedAt: new Date().toISOString(),
          });
        } catch {
          throw new Error("Failed to persist comments to comments table");
        }
      }
    } else {
      try {
        yield call(axios.post, `${API_BASE_URL}/comments`, {
          run_id: runId,
          comments,
          createdAt: new Date().toISOString(),
          createdBy:
            (comments?.length > 0 && comments[comments.length - 1]?.author) ??
            "unknown",
        });
      } catch {
        throw new Error("Failed to create comments thread");
      }
    }

    yield put(updateCommentsSuccess({ runId, comments }));
  } catch (err: any) {
    yield put(updateCommentsFailure(err?.message ?? "Update comments failed"));
  }
}

/** ------------------ deleteResultSaga ------------------ */
export function* deleteResultSaga(
  action: ReturnType<typeof deleteResultRequest>
): Generator<any, void, any> {
  const id = action.payload;
  const enc = (v: any) => encodeURIComponent(sid(v));
  try {
    try {
      yield call(axios.delete, `${API_BASE_URL}/test_results/${sid(id)}`);
    } catch {}

    try {
      const rr = yield call(
        axios.get,
        `${API_BASE_URL}/test_results?run_id=${enc(id)}`
      );
      const arr = rr?.data ?? [];
      for (const it of arr) {
        try {
          yield call(
            axios.delete,
            `${API_BASE_URL}/test_results/${sid(it.resultId)}`
          );
        } catch {}
      }
    } catch {}

    try {
      const byRun = yield call(
        axios.get,
        `${API_BASE_URL}/test_result_rows?run_id=${enc(id)}`
      );
      const list = byRun?.data ?? [];
      for (const r of list) {
        try {
          yield call(
            axios.delete,
            `${API_BASE_URL}/test_result_rows/${sid(r.id)}`
          );
        } catch {}
      }
    } catch {}

    const commentEndpoints = [
      `comments`,
      `test_result_comment`,
      `test_result_comments`,
    ];
    for (const ep of commentEndpoints) {
      try {
        const found = yield call(
          axios.get,
          `${API_BASE_URL}/${ep}?run_id=${enc(id)}`
        );
        const carr = found?.data ?? [];
        for (const t of carr) {
          try {
            yield call(axios.delete, `${API_BASE_URL}/${ep}/${sid(t.id)}`);
          } catch {}
        }
      } catch {}
    }

    try {
      const toRes = yield call(
        axios.get,
        `${API_BASE_URL}/test_orders?run_id=${enc(id)}`
      );
      const ords = toRes?.data ?? [];
      for (const o of ords) {
        try {
          if (o && o.id) {
            try {
              yield call(
                axios.delete,
                `${API_BASE_URL}/test_orders/${sid(o.id)}`
              );
            } catch {
              try {
                yield call(
                  axios.delete,
                  `${API_BASE_URL}/test_order/${sid(o.id)}`
                );
              } catch {}
            }
          }
        } catch {}
      }
    } catch {}

    try {
      const toRes2 = yield call(
        axios.get,
        `${API_BASE_URL}/test_order?run_id=${enc(id)}`
      );
      const ords2 = toRes2?.data ?? [];
      for (const o of ords2) {
        try {
          if (o && o.id) {
            try {
              yield call(
                axios.delete,
                `${API_BASE_URL}/test_order/${sid(o.id)}`
              );
            } catch {}
          }
        } catch {}
      }
    } catch {}

    try {
      const ures = yield call(axios.get, `${API_BASE_URL}/user`);
      const users = ures?.data ?? [];
      for (const u of users) {
        const uid = u?.userId ?? u?.id;
        if (!uid) continue;
        try {
          const nested = yield call(
            axios.get,
            `${API_BASE_URL}/user/${encodeURIComponent(
              uid
            )}/test_orders?run_id=${enc(id)}`
          );
          const nestedArr = nested?.data ?? [];
          for (const no of nestedArr) {
            try {
              yield call(
                axios.delete,
                `${API_BASE_URL}/user/${encodeURIComponent(
                  uid
                )}/test_orders/${sid(no.id)}`
              );
            } catch {
              try {
                if (no && no.id) {
                  yield call(
                    axios.delete,
                    `${API_BASE_URL}/test_orders/${sid(no.id)}`
                  );
                }
              } catch {}
            }
          }
        } catch {}
      }
    } catch {}

    try {
      yield call(axios.delete, `${API_BASE_URL}/test_orders/${sid(id)}`);
    } catch {
      try {
        yield call(axios.delete, `${API_BASE_URL}/test_order/${sid(id)}`);
      } catch {}
    }

    yield put(deleteResultSuccess());
    yield put({ type: fetchListRequest.type });
  } catch (err: any) {
    yield put(deleteResultFailure(err?.message ?? "Delete failed"));
  }
}

/** ------------------ fetchDetailSaga ------------------ */
export function* fetchDetailSaga(
  action: ReturnType<typeof fetchDetailRequest>
): Generator<any, void, any> {
  const orderNumber = action.payload;
  try {
    let testResult: any = null;

    try {
      const byId = yield call(
        axios.get,
        `${API_BASE_URL}/test_results/${encodeURIComponent(orderNumber)}`
      );
      if (byId?.data) testResult = byId.data;
    } catch {}

    if (!testResult) {
      try {
        const byRun = yield call(
          axios.get,
          `${API_BASE_URL}/test_results?run_id=${encodeURIComponent(
            orderNumber
          )}`
        );
        const arr = byRun?.data ?? [];
        if (arr.length > 0) testResult = arr[0];
      } catch {}
    }

    let order: any = null;
    if (!testResult) {
      try {
        order = yield call(findOrderByIdAsync, orderNumber);
        if (order && order.run_id) {
          const tr = yield call(
            axios.get,
            `${API_BASE_URL}/test_results?run_id=${encodeURIComponent(
              order.run_id
            )}`
          );
          const arr = tr?.data ?? [];
          if (arr.length > 0) testResult = arr[0];
        }
      } catch {}
    }

    if (!testResult) throw new Error("Result not found");

    const runId = testResult.run_id ?? testResult.id;

    let rows: any[] = [];
    if (Array.isArray(testResult.rows) && testResult.rows.length > 0) {
      rows = testResult.rows;
    } else {
      try {
        const rr = yield call(
          axios.get,
          `${API_BASE_URL}/test_result_rows?run_id=${encodeURIComponent(
            String(runId)
          )}`
        );
        rows = rr?.data ?? [];
      } catch {}
    }

    const mapped = (rows || []).map((r: any) => ({
      parameter: r.parameter_name ?? r.parameter ?? r.parameter_id ?? "",
      result: String(r.result_value ?? r.result ?? r.value ?? ""),
      unit: r.unit ?? r.uom ?? "",
      referenceRange: r.referenceRange ?? r.reference_range ?? "",
      deviation: r.deviation ?? "",
      flag: r.flag ?? (r.deviation && r.deviation !== "0%" ? "High" : "Normal"),
      appliedEvaluate: r.appliedEvaluate ?? r.evaluate ?? "",
    }));

    let externalComments: any[] = [];
    try {
      const cc = yield call(
        axios.get,
        `${API_BASE_URL}/comments?run_id=${encodeURIComponent(String(runId))}`
      );
      const carr = cc?.data ?? [];
      if (carr.length > 0) externalComments = carr[0].comments ?? [];
    } catch {}

    let patientNameResolved =
      testResult.patientName ?? testResult.patient_name ?? "Unknown";
    try {
      if (
        (patientNameResolved === "Unknown" || !patientNameResolved) &&
        order &&
        (order.userId || order.user_id || order.ownerUserId)
      ) {
        const uid = order.userId ?? order.user_id ?? order.ownerUserId;
        const uName: string | null = yield call(
          resolveUserNameAsync,
          uid,
          {},
          null
        );
        if (uName) patientNameResolved = uName;
      }

      if (
        (patientNameResolved === "Unknown" || !patientNameResolved) &&
        (testResult.userId ||
          testResult.user_id ||
          testResult.runByUserId ||
          testResult.createdBy ||
          testResult.created_by)
      ) {
        const uid =
          testResult.userId ??
          testResult.user_id ??
          testResult.runByUserId ??
          testResult.createdBy ??
          testResult.created_by;
        const uName2: string | null = yield call(
          resolveUserNameAsync,
          uid,
          {},
          null
        );
        if (uName2) patientNameResolved = uName2;
      }
    } catch {}

    let reviewedByResolved =
      testResult.reviewedBy ?? testResult.reviewed_by ?? "Unknown";
    try {
      const rbId =
        testResult.reviewedBy ??
        testResult.reviewed_by ??
        testResult.reviewedByUserId ??
        null;
      if (rbId) {
        const rbName: string | null = yield call(
          resolveUserNameAsync,
          rbId,
          {},
          null
        );
        if (rbName) reviewedByResolved = rbName;
      }
    } catch {}

    const detail = {
      patientName: patientNameResolved,
      sex: testResult.sex ?? "Unknown",
      collected:
        testResult.collected ??
        testResult.performed_at ??
        testResult.created_at ??
        "Unknown",
      instrument: testResult.instrument ?? "Unknown",
      criticalCount:
        testResult.criticalCount ??
        mapped.filter(
          (m) => m.flag === "High" || m.flag === "Low" || m.flag === "Critical"
        ).length,
      rows: mapped,
      reviewedBy: reviewedByResolved,
      reviewedAt: testResult.reviewedAt ?? testResult.reviewed_at ?? "Unknown",
      comments:
        externalComments.length > 0
          ? externalComments
          : Array.isArray(testResult.comments)
          ? testResult.comments
          : [],
      run_id: String(runId),
      hl7_raw: testResult.hl7_raw ?? testResult.raw_hl7 ?? "",
    };

    yield put(fetchDetailSuccess(detail));
  } catch (err: any) {
    yield put(fetchDetailFailure(err?.message ?? "Fetch detail failed"));
  }
}

/** root saga */
export function* testResultsSaga() {
  yield takeLatest(fetchListRequest.type, fetchListSaga);
  yield takeLatest(runTestRequest.type, runTestSaga);
  yield takeLatest(updateCommentsRequest.type, updateCommentsSaga);
  yield takeLatest(deleteResultRequest.type, deleteResultSaga);
  yield takeLatest(fetchDetailRequest.type, fetchDetailSaga);
}
