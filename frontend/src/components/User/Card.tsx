import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

  const API_BASE = "http:://localhost:8080"


export function Login({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState(
    () => localStorage.getItem("last_username") ?? "" 
  )
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      })
      const payload = await res.json().catch(() => null)
      if (!res.ok) throw new Error(payload?.message || "Login failed")

      // ✅ store token & user data
      localStorage.setItem("auth_token", payload.token)
      localStorage.setItem("auth_user", JSON.stringify(payload.data))

      // ✅ optionally remember just the username/email (NOT password)
      if (remember) {
        localStorage.setItem("last_username", email)
      } else {
        localStorage.removeItem("last_username")
      }

      window.location.href = "/Home"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <Button variant="link" onClick={onSwitch}>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="yourusername"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              Remember me
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <CardFooter className="mt-6 flex-col gap-2 px-0">
            <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
            disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

export function Register({ onSwitch }: { onSwitch: () => void }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const payload = await res.json().catch(() => null)
      if (!res.ok) throw new Error(payload?.message || "Registration failed")

      localStorage.setItem("auth_token", payload.token)
      localStorage.setItem("auth_user", JSON.stringify(payload.data))

      // window.location.href = "/" // go to dashboard/home
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign-Up</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={onSwitch}>
            Login
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="yourusername"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <CardFooter className="mt-6 flex-col gap-2 px-0">
            <Button type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90" 
            disabled={loading}>
              {loading ? "Logging in…" : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

export default function AuthCard() {
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {showRegister ? (
        <Register onSwitch={() => setShowRegister(false)} />
      ) : (
        <Login onSwitch={() => setShowRegister(true)} />
      )}
    </div>
  )
}
