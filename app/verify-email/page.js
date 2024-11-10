"use client";
import { Card } from "@/components/ui/card";
import { Globe, Mail } from "lucide-react";

export default function VerifyEmail() {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md p-8 space-y-4">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <Globe className="h-8 w-8" />
          <div className="flex items-center justify-center space-x-2">
            <Mail className="h-8 w-8" />
            <h1 className="text-2xl font-semibold">Check your email</h1>
          </div>
          <p className="text-black/60">
            A sign in link has been sent to your email address. Click the link
            to sign in to your account.
          </p>
        </div>
      </Card>
    </div>
  );
}
