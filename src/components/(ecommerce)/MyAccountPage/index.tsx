"use client";

import { MyAccountLoginForm } from "./MyAccountLoginForm";
import { MyAccountRegisterForm } from "./MyAccountRegisterForm";

export const MyAccountPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Login Section */}
          <div className="bg-white">
            <h2 className="text-2xl md:text-3xl font-normal mb-6 border-b pb-4">Login</h2>
            <MyAccountLoginForm />
          </div>

          {/* Register Section */}
          <div className="bg-white">
            <h2 className="text-2xl md:text-3xl font-normal mb-6 border-b pb-4">Register</h2>
            <MyAccountRegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
};
