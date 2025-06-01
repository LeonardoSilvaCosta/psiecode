import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  title: string;
  linkHref: string;
  linkText: string;
  children: ReactNode;
}

export const DashboardCard = ({
  title,
  linkHref,
  linkText,
  children,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-psiecode-dark-blue">
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-psiecode-cyan hover:text-psiecode-light-blue"
            asChild
          >
            <Link href={linkHref} className="flex items-center gap-1">
              {linkText}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">{children}</div>
      </CardContent>
    </Card>
  );
};
