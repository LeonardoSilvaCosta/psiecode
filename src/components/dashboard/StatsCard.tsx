import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export const StatsCard = ({ title, value, icon: Icon }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-psiecode-dark-blue mt-1">
              {value}
            </h3>
          </div>
          <div className="h-12 w-12 bg-psiecode-cyan/10 rounded-full flex items-center justify-center">
            <Icon className="h-6 w-6 text-psiecode-cyan" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
