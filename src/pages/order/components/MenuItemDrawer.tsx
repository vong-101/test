import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { Menu } from "@/types/menu.type";
import RamenImage from "@/assets/images/ramen.jpg";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import {
  addOrderItemSchema,
  type AddOrderItemInput,
  type AddOrderItemValues,
} from "@/schema/order.schema";
import CustomForm from "@/components/common/CustomForm";
import CustomFormField from "@/components/common/CustomFormField";
import { useOrderStore } from "@/stores/useOrderStore";

interface MenuItemDrawerProps {
  trigger: React.ReactNode;
  menu: Menu;
}

export default function MenuItemDrawer({ trigger, menu }: MenuItemDrawerProps) {
  const [open, setOpen] = useState(false);
  const addToCart = useOrderStore((state) => state.addToCart);

  const defaultValues: AddOrderItemInput = {
    quantity: 1,
    note: "",
  };

  function handleSubmit(values: AddOrderItemValues) {
    addToCart({
      ...menu,
      ...values,
    });
    setOpen(false);
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger ? trigger : <Button>ເປີດ</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>ສັ່ງ {menu.name}</DrawerTitle>
          <DrawerDescription>ເພີ່ມ {menu.name} ເຂົ້າອໍເດີ້</DrawerDescription>
        </DrawerHeader>

        <div className="min-h-auto p-5 flex gap-4 w-full">
          <div className="w-[80px] h-[80px]">
            <img
              className="w-full h-full object-cover rounded-[8px]"
              src={menu.image || RamenImage}
              alt={menu.name}
            />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-bold">{menu.name}</p>
            <p className="text-lg font-bold text-teal-600">
              {formatCurrency(menu.price)}
            </p>
          </div>
        </div>

        <CustomForm
          id="order-item-form"
          schema={addOrderItemSchema}
          defaultValues={defaultValues}
          onSubmit={(values: AddOrderItemValues) => {
            handleSubmit(values);
          }}
          className="px-6 space-y-6"
          showSubmitButton={false}
        >
          {(form) => {
            const quantity = form.watch("quantity");
            return (
              <>
                <CustomFormField name="quantity" label="ຈຳນວນ" type="stepper" />

                <CustomFormField
                  name="note"
                  label="ໝາຍເຫດ (ຖ້າມີ)"
                  placeholder="ເຊັ່ນ: ບໍ່ໃສ່ເຜັດ, ບໍ່ໃສ່ຜັກ..."
                  type="textarea"
                />

                <Button type="submit" className="w-full py-6 bg-teal-600">
                  ເພິ່ມອໍເດີ {formatCurrency(menu.price * quantity)}
                </Button>
              </>
            );
          }}
        </CustomForm>
      </DrawerContent>
    </Drawer>
  );
}
