interface BITAData {
    compliantLowerValue: number;
    almostOutlierLowerValue: number;
    almostOutlierUpperValue: number;
    compliantUpperValue: number;
    currentPortfolioValue: number;
    proposedPortfolioValue: number;
    proposedOutlier: boolean;
    currentOutlier: boolean;
    monitorFlagName: string;
}
declare let setOutliers: (d: BITAData) => void;
declare let Gauge: (ww: number, hh: number, Data: BITAData) => void;
declare var data0: {
    compliantLowerValue: number;
    almostOutlierLowerValue: number;
    almostOutlierUpperValue: number;
    compliantUpperValue: number;
    currentPortfolioValue: number;
    proposedPortfolioValue: number;
    proposedOutlier: boolean;
    currentOutlier: boolean;
    monitorFlagName: string;
}, data1: {
    compliantLowerValue: number;
    almostOutlierLowerValue: number;
    almostOutlierUpperValue: number;
    compliantUpperValue: number;
    currentPortfolioValue: number;
    proposedPortfolioValue: number;
    proposedOutlier: boolean;
    currentOutlier: boolean;
    monitorFlagName: string;
}, data3: {
    compliantLowerValue: number;
    almostOutlierLowerValue: number;
    almostOutlierUpperValue: number;
    compliantUpperValue: number;
    currentPortfolioValue: number;
    proposedPortfolioValue: number;
    proposedOutlier: boolean;
    currentOutlier: boolean;
    monitorFlagName: string;
}, data2: {
    compliantLowerValue: number;
    almostOutlierLowerValue: number;
    almostOutlierUpperValue: number;
    compliantUpperValue: number;
    currentPortfolioValue: number;
    proposedPortfolioValue: number;
    proposedOutlier: boolean;
    currentOutlier: boolean;
    monitorFlagName: string;
};
