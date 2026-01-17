import type { LoginRequest, LoginResponse } from "./types"

export async function loginApi(
  payload: LoginRequest
): Promise<LoginResponse> {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    try {
      const errorData = await response.json()
      const message = errorData?.message || "Invalid username or password"
      throw new Error(message)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Invalid username or password")
    }
  }

  const data = await response.json()
  const token =
    data.token ??
    data.accessToken ??
    data?.data?.token ??
    data?.data?.accessToken

  if (!token) {
    console.log("login response data", data)
    throw new Error("Token not found in login response")
  }

  return { token }
}
