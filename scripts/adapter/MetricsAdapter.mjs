import {pushMetrics} from "../utils/MetricsUtils.mjs";

export function pushMetricsAdapter(metrics) {
    if(window.pingBd){
        pushMetrics(metrics);
    }
}