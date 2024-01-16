import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import logo from "../assets/inktoberv.png";
import Button from "../components/Button";

interface Props {
  onClose: () => void;
}

function Login({ onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  function login() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  }

  return (
    <div className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-white p-2">
      <div className="max-w-screen-sm">
        <div>
          <img src={logo} alt="Bahaso X Inktober" />
        </div>
        <div>
          <Button
            className="w-full bg-neutral-900 py-4 font-bold"
            onClick={login}
          >
            Google Sign In
          </Button>
        </div>
        <div className="mt-3 text-center font-bold underline" onClick={onClose}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default Login;
