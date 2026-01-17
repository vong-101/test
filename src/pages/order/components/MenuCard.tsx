import { CardData } from "@/components/common/CustomCard";
import type { Menu } from "@/types/menu.type";
import RamenImage from "@/assets/images/ramen.jpg";
import { formatCurrency } from "@/lib/utils";
import MenuItemDrawer from "./MenuItemDrawer";

export default function MenuCard({ menuData }: { menuData: Menu }) {
  return (
    <MenuItemDrawer
      menu={menuData}
      trigger={
        <CardData className="min-h-auto p-5 flex gap-4 w-full">
          <div className="w-[80px] h-[80px]">
            <img
              className="w-full h-full object-cover rounded-[8px]"
              src={menuData.image || RamenImage}
              alt={menuData.name}
            />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-bold">{menuData.name}</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-lg font-bold text-teal-600">
                {formatCurrency(menuData.price)}
              </span>
              <div className="rounded-[8px] px-4 py-2 bg-teal-600 text-white font-bold flex items-center justify-center">
                ເພິ່ມ
              </div>
            </div>
          </div>
        </CardData>
      }
    />
  );
}
