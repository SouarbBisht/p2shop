function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
  }
  fetch('https://p2shopbackend.onrender.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'sourab@example.com', discord: 'Sourab#1234' })
  });
  fetch('https://p2shopbackend.onrender.com/api/sell', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Ash',
      pokemon: 'Charizard',
      price: '500',
      contact: 'Discord#1234'
    })
  });
      