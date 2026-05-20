export async function registerUser(username, email, password, role) {
  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, role }),
  });

  if (!response.ok) {
    let errorMessage = 'Registration failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorData || 'Registration failed';
    } catch (e) {
      // Ignore if not JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
