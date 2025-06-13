import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{!pendingVerification ? 'Sign Up' : 'Verify your email'}</CardTitle>
          <CardDescription>
            {!pendingVerification ? 'Create a new account to get started' : 'We sent a verification code to your email'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!pendingVerification ? (
            <>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Continue with Vipps</Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailAddress}
                  placeholder="Email..."
                  onChange={e => setEmailAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Password..."
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <Button onClick={() => setPendingVerification(true)} className="w-full" size="lg">
                Sign Up
              </Button>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Button variant="link" asChild className="h-auto p-0">
                    <Link to="/sign-in">Sign in</Link>
                  </Button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  value={code}
                  placeholder="Enter verification code..."
                  onChange={e => setCode(e.target.value)}
                />
              </div>

              <Button
                onClick={() => {
                  alert('verified');
                  navigate('/');
                }}
                className="w-full"
                size="lg"
              >
                Verify Email
              </Button>

              <div className="text-center">
                <Button variant="link" onClick={() => setPendingVerification(false)} className="text-sm">
                  Back to sign up
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
