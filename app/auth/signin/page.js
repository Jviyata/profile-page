import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

const SignInPage = () => {
  return (
    <div className="form-page-shell">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  );
};

export default SignInPage;
