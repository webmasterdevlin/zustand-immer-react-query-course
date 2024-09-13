import { Link, useNavigate, createLazyFileRoute } from '@tanstack/react-router'; // For SPA routing
import { useState } from 'react';

export const Route = createLazyFileRoute('/sign-up')({
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  return (
    <div className="flex h-screen flex-col items-center justify-start bg-white pt-5">
      {!pendingVerification && (
        <>
          <div className="mb-5 w-11/12">
            <button className="mt-3.5 flex w-full items-center justify-center rounded-md border-orange-500 bg-orange-600 p-2.5">
              <span className="font-bold text-white">Forsett med Vipps</span>
            </button>
          </div>
          <div className="mb-5 h-11 w-11/12 rounded-md">
            <input
              type="email"
              value={emailAddress}
              placeholder="Email..."
              className="w-full rounded-md"
              onChange={e => {
                return setEmailAddress(e.target.value);
              }}
            />
          </div>
          <div className="mb-5 h-11 w-11/12 rounded-md">
            <input
              type="password"
              value={password}
              placeholder="Password..."
              className="w-full rounded-md"
              onChange={e => {
                return setPassword(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              navigate({ to: '/' });
            }}
            className="mt-10 flex h-12 w-11/12 items-center justify-center rounded-md bg-black text-white"
          >
            <span className="font-bold text-white">Sign up</span>
          </button>

          <div className="mt-5 flex w-full flex-col items-center justify-start bg-white text-black">
            <p>Have an account?</p>
            <Link to="/sign-in" className="mt-3.5 flex w-11/12 items-center justify-center rounded-md bg-white p-2.5">
              <span className="font-bold text-black">Sign in</span>
            </Link>
          </div>
        </>
      )}

      {pendingVerification && (
        <>
          <input
            type="text"
            value={code}
            placeholder="Code..."
            className="mb-5 h-11 w-11/12 rounded-md border border-solid border-black p-2.5"
            onChange={e => {
              return setCode(e.target.value);
            }}
          />
          <button
            onClick={() => {
              alert('verified');
            }}
            className="flex h-12 w-11/12 items-center justify-center rounded-md bg-black text-white"
          >
            <span className="font-bold text-white">Verify Email</span>
          </button>
        </>
      )}
    </div>
  );
}