
/**
 * Downloads a file to the client
 * @param filename Filename
 * @param content File content
 */
export function downloadFile(filename: string, content: string) {
    const element = document.createElement("a");
    element.style.display = "none";
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", filename);

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}