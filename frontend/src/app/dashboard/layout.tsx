import GrocerySidebar from "@/src/components/layout/GrocerySidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GrocerySidebar>{children}</GrocerySidebar>;
}
