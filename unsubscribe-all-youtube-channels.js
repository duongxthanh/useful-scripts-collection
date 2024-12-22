/**
 * Source: howtogeek
 * YouTube bulk unsubscribe function.
 * Wrapping this in an IIFE for browser compatibility.
 */
(async function iife() {
    // This is the time delay after which the "unsubscribe" button is "clicked"; change it as per your need!
    const UNSUBSCRIBE_DELAY_TIME = 2000;

    /**
     * Delay runner. Wraps `setTimeout` so it can be `await`ed on.
     * @param {Function} fn - The function to run after delay.
     * @param {number} delay - The delay in milliseconds.
     */
    const runAfterDelay = (fn, delay) => 
        new Promise((resolve, reject) => {
            setTimeout(() => {
                fn();
                resolve();
            }, delay);
        });

    // Get the channel list; this can be considered a row in the page.
    const channels = Array.from(document.getElementsByTagName('ytd-channel-renderer'));
    console.log(`${channels.length} channels found.`);

    let ctr = 0;
    for (const channel of channels) {
        // Get the subscribe button and trigger a "click"
        channel.querySelector(`[aria-label^='Unsubscribe from']`).click();
        
        await runAfterDelay(() => {
            // Get the dialog container...
            const dialog = document.getElementsByTagName('yt-confirm-dialog-renderer')[0];
            if (dialog) {
                // and find the confirm button...
                dialog.querySelector(`[aria-label^='Unsubscribe']`).click();
                console.log(`Unsubscribed ${ctr + 1}/${channels.length}`);
                ctr++;
            }
        }, UNSUBSCRIBE_DELAY_TIME);
    }
})();
