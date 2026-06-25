'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}

export default function SubmitButton({ 
  children, 
  pendingText = 'Submitting...', 
  className = '' 
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition duration-200 ${className}`}
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? pendingText : children}
    </button>
  );
}
