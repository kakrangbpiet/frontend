export const convertFileToBase64 = (file: Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64Data = reader.result as string | null; // Type assertion
            if (base64Data) {
                resolve(base64Data.split(",")[1]); // Extract the base64 data part
            } else {
                reject(new Error("File reading failed"));
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    });
};