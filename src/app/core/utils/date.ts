export class DateUtil {
    /**
     * Get now
     */
    static getNow(): string {
        return new Date().toISOString();
    }

    /**
     * Get Date format (yyyy-mm-dd)
     * @param newDate
     */
    static getFullDate(newDate) {
        if (!newDate) {
            return;
        }

        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    /**
     * Convert Month - Year to Datetime
     * @param month
     * @param year
     */
    static convertMonthYearToDateTime(month: number, year: number) {
        const date = new Date();
        date.setMonth(month);
        date.setFullYear(year);
        return date;
    }

    static getFullDateTime(newDate, ref?: string) {
        if (!newDate) {
            return;
        }
        if (ref == null || ref == undefined) {
            ref = ' ';
        }

        let today = new Date(newDate);
        let dd = String(today.getDate()).padStart(2, '0');
        let MM = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();

        let HH = String(today.getHours()).padStart(2, '0');
        let mm = String(today.getMinutes()).padStart(2, '0');
        let ss = String(today.getMilliseconds()).padStart(2, '0');

        return `${yyyy}-${MM}-${dd}${ref}${HH}:${mm}:00`;
    }

    /**
     * Convert date time formmat (dd/mm/yyyy)
     * @param newDate
     */
    static convertDateTime(newDate) {
        if (!newDate) {
            return;
        }

        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }
}
