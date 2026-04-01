// Using built-in fetch in Node.js 18+

async function testChat() {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: "What are Ayush Singh's key skills?",
      history: [],
      language: "en"
    })
  });

  const data = await response.json();
  console.log('Bot Response:', data.response);
}

testChat().catch(console.error);
