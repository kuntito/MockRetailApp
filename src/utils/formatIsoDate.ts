export const formatIsoDate = (isoString: string) => {
    const monthNames = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];

    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()]; // No +1 needed since array is 0-indexed
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
};
