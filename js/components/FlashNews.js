
// FlashNews.js - třída - komponenta pro zobrazování flash zpráv

export default class FlashNews {
    constructor(containerID) {
        this.containerID = document.getElementById(containerID);
    }

    showMessage(message, type = 'info', timeout = 3000) {
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${type} alert-dismissible shadow fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `${message}`;

        this.containerID.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 500);
        }, timeout);
    }
}  