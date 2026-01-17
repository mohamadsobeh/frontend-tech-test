import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Lock, LogIn, Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "./AuthProvider"
import { loginApi } from "./api"

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    username?: string
    password?: string
  }>({})
  const [formError, setFormError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setFormError("")

    // Validate with zod
    const validationResult = loginSchema.safeParse({ username, password })
    if (!validationResult.success) {
      const fieldErrors: { username?: string; password?: string } = {}
      validationResult.error.issues.forEach((err) => {
        if (err.path[0] === "username") {
          fieldErrors.username = err.message
        } else if (err.path[0] === "password") {
          fieldErrors.password = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setLoading(true)

    try {
      const result = await loginApi({ username, password })
      login(result.token)
      // Cleanup any leftover "token" key from localStorage
      localStorage.removeItem("token")
      toast.success("Welcome back!")
      navigate("/dashboard", { replace: true })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid username or password"
      setFormError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background p-4">
      {/* Subtle radial glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-muted/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Card className="rounded-xl border-border/60 shadow-lg">
          <CardHeader className="space-y-1 text-left">
            <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
            <CardDescription>Sign in to continue to your dashboard.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} id="login-form" className="space-y-4">
              {formError && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2">
                  <p className="text-xs text-destructive">{formError}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-9"
                    disabled={loading}
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-destructive">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="rounded-md border border-border/60 bg-muted/40 px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  Test credentials: emilys / emilyspass
                </p>
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              form="login-form"
              className="w-full"
              disabled={loading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
