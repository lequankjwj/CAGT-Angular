export class ReportUtil {
    /**
     * Convert Blob to Resource
     * @param resource
     * @param fileType
     * @param fileName
     */
    static convertResourceToBlob(resource, fileType: string, fileName: string) {
        const blob = new Blob([resource], {
            type: fileType,
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);

        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }, 100);
    }

    /**
     * Generate extension value
     */
    static generateExtensionReport() {
        const m = new Date();
        return (
            m.getFullYear().toString() +
            (m.getMonth() + 1).toString().padStart(2, '0') +
            m.getDate().toString().padStart(2, '0') +
            m.getHours().toString().padStart(2, '0') +
            m.getMinutes().toString().padStart(2, '0') +
            m.getSeconds().toString().padStart(2, '0')
        );
    }

    /**
     * Get extension file from header content diposition
     * @param contentDiposition
     */
    static getExtension(contentDiposition: string) {
        const converToArray = contentDiposition.split('.');
        return `${converToArray[converToArray.length - 1]}`;
    }
}
