import Breadcrumb from "@/components/common/Breadcrumb";
import { CardContainer } from "@/components/common/CustomCard";
import CustomFilter, {
  type FilterOption,
} from "@/components/common/CustomFilter";
import Topbar from "@/components/common/Topbar";
import { MOCK_CATEGORIES } from "@/mocks/category.mock";
import MenuCard from "./components/MenuCard";
import { MOCK_MENUS } from "@/mocks/menu.mock";
import { useOrderStore } from "@/stores/useOrderStore";
import OrderReviewDrawer from "./components/OrderReviewDrawer";

const filterOptions: FilterOption[] = [
  {
    key: "category",
    label: "ເລືອກຫມວດຫມູ່ອາຫານ",
    options: MOCK_CATEGORIES.map((category) => ({
      label: category.name,
      value: category._id,
    })),
  },
];

export default function Order() {
  return (
    <div className="relative">
      <header className="bg-white fixed md:absolute z-50 top-0 left-0 w-full">
        <Topbar title="ເມນູອາຫານ" subtitle="ເລືອກລາຍການອາຫານເພື່ອສ້າງອໍ້ເດີ້" />
      </header>

      <div className="content-container relative">
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

        <ul className="space-y-3 pb-[140px]">
          {MOCK_MENUS.map((menu) => (
            <li key={menu._id}>
              <MenuCard menuData={menu} />
            </li>
          ))}
        </ul>

        {/* Floating Order Review Bar */}
        <OrderReviewDrawer />
      </div>
    </div>
  );
}
