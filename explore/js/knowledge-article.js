(function () {
  'use strict';

  const shareUrls = {
    facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: (url) => `https://x.com/intent/post?url=${encodeURIComponent(url)}`,
    linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    reddit: (url) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`
  };

  function fallbackCopy(value) {
    const input = document.createElement('textarea');
    input.value = value;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    return copied;
  }

  document.addEventListener('click', async function (event) {
    const shareLink = event.target.closest('[data-share-platform]');
    if (shareLink) {
      event.preventDefault();
      const createUrl = shareUrls[shareLink.getAttribute('data-share-platform')];
      if (!createUrl) return;
      window.open(createUrl(window.location.href), '_blank', 'noopener,noreferrer,width=640,height=560');
      return;
    }

    const copyButton = event.target.closest('[data-copy-link]');
    if (!copyButton) return;
    event.preventDefault();
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
        copied = true;
      } else {
        copied = fallbackCopy(window.location.href);
      }
    } catch (_error) {
      copied = fallbackCopy(window.location.href);
    }
    const feedback = copyButton.parentElement.querySelector('.post-copy-feedback');
    if (feedback) {
      feedback.textContent = copied ? copyButton.getAttribute('data-copied-label') : copyButton.getAttribute('data-copy-error-label');
      window.setTimeout(() => { feedback.textContent = ''; }, 2200);
    }
  });
}());
