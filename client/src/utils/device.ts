const size = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tabletS: "540px",
    tabletL: "768px",
    laptop: "1024px",
    desktopS: "1366px",
    desktopM: "1920px",
    desktopL: "2560px"
};

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tabletL: `(max-width: ${size.tabletL})`,
    laptop: `(max-width: ${size.laptop})`,
    desktopS: `(max-width: ${size.desktopS})`,
    desktopM: `(max-width: ${size.desktopM})`,
    desktopL: `(max-width: ${size.desktopL})`
};
