export function loadFile(filter?: string) {
    return new Promise<string | undefined>(resolve => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = filter ?? "*";
        input.style.display = "none";
        document.body.appendChild(input);
    
        input.addEventListener('change', function () {
    
            var fr = new FileReader();
            fr.onload = function () {
                resolve(String(fr.result));
            }
            const file = input.files?.[0];
            if (file) {
                fr.readAsText(file);
            }
            else resolve(undefined);
        })
        input.click();
    });
}