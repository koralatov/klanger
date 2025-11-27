//  Script:   better-404.js
//  Version:  1.0
//  Dated:    2025-11-27
//  Function: Redirects 404s to a custom 404 page.

function checkAndRedirectFor404() {
    const currentUrl = document.location.href;
    const redirectUrl = "https://koralatov.com/404";

    // Use the native fetch API to make a lightweight HEAD request.
    fetch(currentUrl, {
        method: 'HEAD'
    })
    // .then() handles the server response (even error codes like 404)
    .then(response => {
        // If the response is not "ok" (i.e., status is 400 or higher)
        // AND the specific status is 404, perform the redirect.
        if (!response.ok && response.status === 404) {
            
            // Perform the client-side redirect to the specified URL.
            document.location.href = redirectUrl;
        }
    })
    // .catch() handles true network failures (e.g., DNS error, no internet)
    .catch(error => {
        // You can log network errors here, but no redirect is necessary.
        console.error("Network error during 404 check:", error);
    });
}

// Execute the check when the script runs
checkAndRedirectFor404();
