import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { formatCurrency } from "@/lib/utils";
import { useOrderStore } from "@/stores/useOrderStore";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import CartItem from "./CartItem";

export default function OrderReviewDrawer() {
  const [open, setOpen] = useState(false);
  const { items, getTotalPrice } = useOrderStore();

  if (items.length === 0) return null;

  function handleConfirmOrder() {
    const orderItems = items.map((item) => ({
      menuId: item._id,
      quantity: item.quantity,
      note: item.note,
    }));

    console.log(orderItems);

    setOpen(false);
  }

  return (
    <div className="fixed bottom-[70px] left-0 w-full px-2 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className=" bg-white border border-zinc-100 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] rounded-xl flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-teal-600">
                  {items.length} ລາຍການ • {formatCurrency(getTotalPrice())}
                </p>
                <p className="text-xs text-zinc-500">ກວດສອບລາຍການອາຫານ</p>
              </div>
            </div>
            <div className="text-sm bg-teal-600 text-white font-bold px-6 py-2 rounded-[8px] flex items-center justify-center">
              ກວດສອບອໍເດີ
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="max-h-[95vh]">
          <DrawerHeader className="relative border-b pb-4">
            <div className="flex flex-col items-start gap-1">
              <DrawerTitle className="text-xl font-bold">
                ກວດສອບອໍເດີ
              </DrawerTitle>
              <p className="text-sm text-amber-700 font-medium">ໂຕະ: 5</p>
              <DrawerDescription className="sr-only">
                ກວດສອບລາຍລະອຽດອານກ່ອນເຮັດການສ້າງອໍເດີ້
              </DrawerDescription>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </DrawerHeader>

          <div className="p-4 overflow-y-auto space-y-4">
            {/* List of items */}
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={`${item._id}-${index}`}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Total Summary Box */}
          <div className="px-4 pt-1">
            <div className="bg-teal-50/50 rounded-xl py-2 px-4 border border-teal-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600">ຈຳນວນລາຍການ:</span>
                <span className="font-bold">{items.length} ລາຍການ</span>
              </div>
              <div className="flex justify-between items-end pt-1">
                <span className=" font-bold">ລວມທັງຫມົດ:</span>
                <span className="text-lg font-black text-teal-600">
                  {formatCurrency(getTotalPrice())}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 py-2 px-4">
            <Button
              onClick={handleConfirmOrder}
              className="w-full py-6 font-bold bg-teal-600 hover:bg-teal-700 rounded-xl shadow-lg shadow-teal-600/20"
            >
              ຢືນຢັນການສ້າງອໍເດີ້
            </Button>
            <Button
              variant="secondary"
              className="w-full py-6 text-zinc-600 font-bold bg-zinc-100 hover:bg-zinc-200 rounded-xl"
              onClick={() => setOpen(false)}
            >
              ເພີ່ມເມນູອື່ນ
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
