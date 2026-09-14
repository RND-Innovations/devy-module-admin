const pendingApiRequests = new Set();

window.fetchJson = async function(url, data = {}, options = {}) {
    const requestKey = `${options.method || 'POST'}:${url}`;

    if (pendingApiRequests.has(requestKey)) {
        showToast('Please wait, request is already processing...', 'warning', 2000);
        return null;
    }

    pendingApiRequests.add(requestKey);
    
    // Passing 0 duration keeps loading toast visible until manually closed
    const loadingToast = showToast(options.loadingText || 'Processing request...', 'info', 0);

    try {
        const response = await fetch(url, {
            method: options.method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(options.headers || {})
            },
            body: JSON.stringify(data)
        });

        const jsonResult = await response.json();

        if (!response.ok) {
            throw new Error(jsonResult.message || `HTTP Error ${response.status}`);
        }

        loadingToast.close();
        if (options.showSuccessToast !== false) {
            showToast(options.successText || 'Completed successfully!', 'success', 3000);
        }

        return jsonResult;
    } catch (error) {
        loadingToast.close();
        showToast(options.errorText || error.message || 'Server request failed', 'error', 4000);
        throw error;
    } finally {
        pendingApiRequests.delete(requestKey);
    }
};

window.showToast = function(message, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <span class="icon">${icons[type] || 'ℹ'}</span>
        <div class="content">${message}</div>
        ${duration > 0 ? `<div class="progress" style="animation-duration: ${duration}ms;"></div>` : ''}
    `;

    container.appendChild(toast);

    let timer;
    const removeToast = () => {
        toast.classList.add('hide');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    };

    if (duration > 0) {
        timer = setTimeout(removeToast, duration);
    }

    return {
        element: toast,
        close: () => {
            clearTimeout(timer);
            removeToast();
        }
    };
};

window.copyToClipboard = async function(text, successMsg = 'Copied to clipboard!') {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.cssText = 'position:fixed;opacity:0;top:-9999px;left:-9999px;';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const success = document.execCommand('copy');
            textarea.remove();
            if (!success) throw new Error('Copy command failed');
        }
        showToast(successMsg, 'success', 2000);
        return true;
    } catch (err) {
        console.error('Clipboard copy failed:', err);
        showToast('Failed to copy text', 'error', 3000);
        return false;
    }
};

window.showModal = function({ 
    title = '', 
    content = '', 
    onConfirm = null, 
    confirmText = 'OK', 
    cancelText = 'Cancel' 
}) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center; z-index: 10000;
        opacity: 0; transition: opacity 0.25s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #fff; color: #1f2937; border-radius: 12px; padding: 20px;
        min-width: 300px; max-width: 480px; width: 90%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
        transform: scale(0.95); transition: transform 0.25s ease; font-family: sans-serif;
    `;

    modal.innerHTML = `
        ${title ? `<h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">${title}</h3>` : ''}
        <div style="font-size: 14px; margin-bottom: 20px; color: #4b5563; line-height: 1.5;">${content}</div>
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
            ${onConfirm ? `<button class="modal-cancel-btn" style="padding: 8px 14px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; font-size: 13px;">${cancelText}</button>` : ''}
            <button class="modal-confirm-btn" style="padding: 8px 14px; border-radius: 6px; border: none; background: #2563eb; color: #fff; cursor: pointer; font-size: 13px;">${confirmText}</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });

    const closeModal = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        setTimeout(() => overlay.remove(), 250);
    };

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    const confirmBtn = modal.querySelector('.modal-confirm-btn');
    confirmBtn.addEventListener('click', async () => {
        if (onConfirm) await onConfirm();
        closeModal();
    });

    const cancelBtn = modal.querySelector('.modal-cancel-btn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
};

document.querySelectorAll('.toast').forEach((el, i) => {
    const delay = 5000 + (i * 400);

    setTimeout(() => {
        el.classList.add('hide');
        setTimeout(() => el.remove(), 300);
    }, delay);
});