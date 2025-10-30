(function () {
	const navToggle = document.getElementById('navToggle');
	const mainNav = document.getElementById('mainNav');
	const notificationsBtn = document.getElementById('notificationsBtn');
	const notificationsPanel = document.getElementById('notificationsPanel');
	const closeNotif = document.getElementById('closeNotif');
	const notifBadge = document.getElementById('notifBadge');

	function closePanel() {
		if (notificationsPanel) {
			notificationsPanel.classList.remove('is-open');
			notificationsPanel.setAttribute('aria-hidden', 'true');
			if (notificationsBtn) notificationsBtn.setAttribute('aria-expanded', 'false');
		}
	}

	if (navToggle && mainNav) {
		navToggle.addEventListener('click', function () {
			mainNav.classList.toggle('is-open');
		});
	}

	if (notificationsBtn && notificationsPanel) {
		notificationsBtn.addEventListener('click', function () {
			const isOpen = notificationsPanel.classList.toggle('is-open');
			notificationsPanel.setAttribute('aria-hidden', String(!isOpen));
			notificationsBtn.setAttribute('aria-expanded', String(isOpen));
			if (isOpen && notifBadge) {
				notifBadge.style.display = 'none';
			}
		});
	}

	if (closeNotif) {
		closeNotif.addEventListener('click', closePanel);
	}

	document.addEventListener('click', function (e) {
		if (!notificationsPanel || !notificationsBtn) return;
		const clickInsidePanel = notificationsPanel.contains(e.target);
		const clickOnButton = notificationsBtn.contains(e.target);
		if (!clickInsidePanel && !clickOnButton) {
			closePanel();
		}
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closePanel();
	});
})();

