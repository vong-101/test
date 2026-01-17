import { formatCurrency } from "@/lib/utils";
import type { OrderItem } from "@/stores/useOrderStore";
import { useOrderStore } from "@/stores/useOrderStore";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  item: OrderItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useOrderStore();
  return (
    <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
      <div className="flex justify-between items-start">
        <p className="font-bold text-base text-[#333]">{item.name}</p>
        <button
          onClick={() => removeFromCart(item._id, item.note)}
          className="text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="text-teal-600 text-sm font-bold">
        {formatCurrency(item.price)} x {item.quantity} ={" "}
        {formatCurrency(item.price * item.quantity)}
      </div>

      {item.note && (
        <div className="text-xs text-amber-600 font-medium mb-3 italic">
          ໝາຍເຫດ: {item.note}
        </div>
      )}

      <div className="flex justify-between text-sm items-center mt-1">
        <p className="text-zinc-500 font-medium">ປັບຈຳນວນ:</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              updateQuantity(
                item._id,
                Math.max(1, item.quantity - 1),
                item.note
              )
            }
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center border border-zinc-300 bg-white rounded-lg hover:bg-zinc-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>
          <span className="font-bold text-lg min-w-[20px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() =>
              updateQuantity(item._id, item.quantity + 1, item.note)
            }
            className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
