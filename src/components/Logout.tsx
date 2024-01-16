import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  function logout() {
    const auth = getAuth();
    signOut(auth);
  }

  return (
    <button
      className="mx-auto my-12 block max-w-24 font-bold tracking-widest"
      onClick={logout}
    >
      LOGOUT
    </button>
  );
};

export default Logout;
