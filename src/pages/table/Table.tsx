import { CardContainer } from "@/components/common/CustomCard";
import CustomFilter, {
  type FilterOption,
} from "@/components/common/CustomFilter";
import Topbar from "@/components/common/Topbar";
import { MOCK_TABLES } from "@/mocks/table.mock";
import type { Table } from "@/types/table.type";
import TableCard from "./components/TableCard";
import EmptyState from "@/components/common/EmptyState";
import { Link } from "react-router";
import Breadcrumb from "@/components/common/Breadcrumb";

const filterOptions: FilterOption[] = [
  {
    key: "status",
    label: "ສະຖານະ",
    options: [
      { label: "ວ່າງ", value: "AVAILABLE" },
      { label: "ມີລູກຄ້າ", value: "OCCUPIED" },
      { label: "ລໍຖ້າຊຳລະເງິນ", value: "WAITING_PAYMENT" },
      { label: "ລໍຖ້າເຮັດຄວາມສະອາດ", value: "NEED_CLEANING" },
    ],
  },
];

export default function Table() {
  return (
    <div className="relative">
      <header className="fixed md:absolute z-50 top-0 left-0 w-full">
        <Topbar title="ລາຍການໂຕະ" subtitle="ເບິ່ງລາຍການໂຕະ, ສັ່ງອາຫານລົງໂຕະ" />
      </header>

      <div className="content-container">
        <Breadcrumb
          className="hidden md:flex"
          items={[
            {
              label: "ລາຍການໂຕະ",
            },
          ]}
        />

        <CardContainer>
          <CustomFilter selectors={filterOptions} />
        </CardContainer>

        {MOCK_TABLES.length > 0 ? (
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-auto gap-4">
            {MOCK_TABLES.map((table: Table) => (
              <li key={table._id}>
                <Link to={`/table/order-detail/${table._id}`}>
                  <TableCard tableData={table} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="ບໍ່ມີຂໍ້ມູນໂຕະ"
            description="ປະຈຸບັນຍັງບໍ່ມີຂໍ້ມູນໂຕະໃນລະບົບ"
          />
        )}
      </div>
    </div>
  );
}
