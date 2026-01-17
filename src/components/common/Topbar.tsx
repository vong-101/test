import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Card className="py-0 bg-white space-y-0 rounded-none shadow-none border-0 border-b border-zinc-200 min-h-[64px] md:h-[84px] flex items-center">
      <CardHeader className="px-4 py-2 md:px-5 md:py-3 flex flex-col justify-center w-full overflow-hidden">
        <CardTitle className="text-xl md:text-2xl font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </CardTitle>
        {subtitle && (
          <CardDescription className="text-xs md:text-sm text-zinc-500 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {subtitle}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
