const uploadForm = document.getElementById("uploadForm");
const videoFile = document.getElementById("videoFile");
const preview = document.getElementById("preview");

// Replace with your own Cloudinary info
const cloudName = "YOUR_CLOUD_NAME"; // e.g., "mycloud"
const unsignedUploadPreset = "YOUR_UPLOAD_PRESET"; // e.g., "preset1"

uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const file = videoFile.files[0];
    if (!file) return alert("Please select a video.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Uploaded:", data);
        const videoUrl = data.secure_url;
        preview.innerHTML = `<video controls src="${videoUrl}"></video>`;
    })
    .catch(err => {
        console.error(err);
        alert("Upload failed. Check console for details.");
    });
});