export async function loginUser(email, password) {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMessage = 'Login failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorData || 'Login failed';
    } catch (e) {
      // If the response is not valid JSON, it might be plain text
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
