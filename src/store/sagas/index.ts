import { all, fork } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { userSaga } from "./userSaga";
import { patientSaga } from "./patientSaga";
import { instrumentSaga } from "./instrumentSaga";
import { roleSaga } from "./roleSaga";
import { reagentSaga } from "./reagentSaga";
import { testResultsSaga } from "./testResultsSaga";
import { testOrdersSaga } from "./testOrderSaga";
import { testOrderSaga } from "./reportSaga";

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(patientSaga),
    fork(testOrderSaga),
    fork(instrumentSaga),
    fork(roleSaga),
    fork(reagentSaga),
    fork(testResultsSaga),
    fork(testOrdersSaga),
  ]);
}
