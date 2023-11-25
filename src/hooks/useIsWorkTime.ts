import React, {useMemo} from 'react';
import {createDefaultParams} from "../utils/datetime/getParamsTimePeriod";
import {getTimes} from "../utils/datetime/avaliableTimes";
import {isCurrentDateInRange} from "../utils/datetime/isCurrentDateInRange";

type IsWorkTimeHookProps = {
    startTime: string,
    endTime: string,
    is_around_time?: boolean
}
type IsWorkTimeHook = {
    isCurrent: boolean
    orderTimes: string[]
}
const useIsWorkTime = (params: IsWorkTimeHookProps): IsWorkTimeHook => {

    const orderTimesParams = useMemo(() => createDefaultParams(params.startTime, params.endTime), [params])
    const orderTimes = useMemo(() => getTimes(orderTimesParams), [orderTimesParams])
    const currentTimeIsWorkTime = useMemo(() => !params.is_around_time ? isCurrentDateInRange(orderTimesParams.startDate, orderTimesParams.endDate) : true , [params])

    return {
        isCurrent: currentTimeIsWorkTime,
        orderTimes
    }
};

export default useIsWorkTime;