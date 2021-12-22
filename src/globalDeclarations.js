export const monthsObj = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
    "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
};

export const formatMoney = (value) => {

    if (/^[-]/.test(value)) {
        return parseFloat(value.substring(1)).toFixed(2);
    } else {
        return parseFloat(value).toFixed(2);
    };
};

export const formatDate = (date) => {

    if (date === "") {
        return "";
    } else {
        let dateArray = date.split("-");
        let year = dateArray[0];
        let month = dateArray[1];
        let day = dateArray[2];
        return monthsObj[month] + " " + day + ", " + year;
    };
};