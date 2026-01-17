import { TableStatusBadge } from "@/components/common/Table";
import Topbar from "@/components/common/Topbar";
import { ArrowLeftIcon, Plus } from "lucide-react";
import {
  Link,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { MOCK_TABLES } from "@/mocks/table.mock";
import type { TableStatus } from "@/types/table.type";
import EmptyState from "@/components/common/EmptyState";
import { CardContainer } from "@/components/common/CustomCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OrderItemStatusBadge } from "@/components/common/Order";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/common/Breadcrumb";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return { tableId: id };
}

export default function TableOrderDetail() {
  const { tableId } = useLoaderData();
  const navigate = useNavigate();

  const table = MOCK_TABLES.find((table) => table._id === tableId);

  return (
    <div className="relative ">
      <header className="fixed md:absolute z-50 top-0 left-0 w-full">
        <div className="md:hidden bg-white px-4 pt-2 flex items-center justify-between">
          <Link to={"/table"}>
            <ArrowLeftIcon size={30} />
          </Link>
          <TableStatusBadge status={table?.status as TableStatus} />
        </div>
        <Topbar
          title={`ໂຕະ: ${table?.name || ""}`}
          subtitle={`ລາຍລະອຽດອໍເດີ້ຂອງໂຕະ ${table?.name}`}
        />
      </header>

      <div className="content-container pt-[116.8px]">
        <Breadcrumb
          className="hidden md:flex"
          items={[
            {
              label: "ລາຍການໂຕະ",
              href: "/table",
            },
            {
              label: `ລາຍລະອຽດອໍເດີ້ຂອງໂຕະ ${table?.name}`,
            },
          ]}
        />
        {!table?.currentOrder ? (
          <EmptyState
            title="ດຽວນີ້ໂຕະນີ້ບໍ່ມີອໍເດີ້"
            description="ກະລຸນາກົດປຸ່ມດ້ານລຸ່ມເພື່ອໄປໜ້າສັ່ງອາຫານ"
            action={{
              label: "ໄປໜ້າສັ່ງອາຫານ",
              onClick: () => navigate("/order"),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* 1. Summary Card - Always top on mobile, top of sidebar on desktop */}
            <div className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-[124px] lg:space-y-6">
              <CardContainer className="p-5 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500">ລະຫັດອໍເດີ</p>
                      <p className="font-bold  text-lg">
                        {table?.currentOrder?.orderId}
                      </p>
                    </div>
                    <div className="text-end space-y-1">
                      <p className="text-sm text-zinc-500">ລວມທັງຫມົດ</p>
                      <p className="font-bold text-2xl text-teal-600">
                        {formatCurrency(table?.currentOrder?.totalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="py-3 border-t border-zinc-100">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-zinc-500">
                        {table?.currentOrder?.orderItems.length} ລາຍການ
                      </span>
                      <span className="font-medium text-sm text-zinc-500">
                        ສ້າງເມື່ອ{" "}
                        {formatDate(table?.currentOrder?.createdAt, "HH:mm")}{" "}
                        ໂມງ
                      </span>
                    </div>
                  </div>
                </div>
              </CardContainer>

              {/* Actions for Desktop - Directly below summary in the sidebar */}
              <div className="hidden lg:block">
                <CardContainer className="p-4 space-y-4">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-md has-[>svg]:py-6 flex items-center justify-center gap-3 w-full transition-all">
                    <Plus size={20} />
                    <span className="text-base font-semibold">
                      ສັ່ງອາຫານເພິ່ມ
                    </span>
                  </Button>
                  <Button className="w-full py-6 bg-sky-500 hover:bg-sky-600 text-white font-medium">
                    ໂຕະວ່າງແລ້ວ
                  </Button>
                </CardContainer>
              </div>
            </div>

            {/* 2. Items List - Middle on mobile, Left on desktop */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <CardContainer className="p-0 overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50/50">
                  <p className="font-semibold text-lg">ລາຍການອາຫານ</p>
                </div>
                <ul className="px-5 [&>li]:border-b [&>li]:border-zinc-100 [&>li:last-child]:border-b-0">
                  {table?.currentOrder?.orderItems.map((item) => (
                    <li key={item.menuName} className="space-y-1 py-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-base">
                          {item.menuName}
                        </span>
                        <span className="font-bold text-base text-teal-600">
                          {formatCurrency(item.price)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-zinc-500">
                          ຈຳນວນ: {item.quantity}
                        </span>
                        <OrderItemStatusBadge
                          className="text-[10px]"
                          status={item.status}
                        />
                      </div>

                      {item.note && (
                        <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded-md mt-2">
                          ຫມາຍເຫດ: {item.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContainer>
            </div>

            {/* 3. Actions for Mobile - Appears at the bottom */}
            <div className="lg:hidden order-3">
              <CardContainer className="p-4 space-y-4">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-md has-[>svg]:py-6 flex items-center justify-center gap-3 w-full transition-all">
                  <Plus size={20} />
                  <span className="text-base font-semibold">
                    ສັ່ງອາຫານເພິ່ມ
                  </span>
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="py-6 bg-sky-500 hover:bg-sky-600 text-white font-medium">
                    ໂຕະວ່າງແລ້ວ
                  </Button>
                  <Button className="py-6 bg-amber-500 hover:bg-amber-600 text-white font-medium">
                    ຍ້າຍໂຕະ
                  </Button>
                </div>
              </CardContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
