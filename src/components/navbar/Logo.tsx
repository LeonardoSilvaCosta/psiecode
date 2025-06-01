import Link from "next/link";
import { Brain } from "lucide-react";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Brain className="h-8 w-8 text-psiecode-light-blue" />
      <span className="font-bold text-2xl text-psiecode-dark-blue">
        Psiecode
      </span>
    </Link>
  );
};
