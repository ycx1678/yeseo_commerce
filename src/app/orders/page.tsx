import { OrdersPage } from "@/components/storefront/OrdersPage";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

type OrdersRouteProps = {
  searchParams: Promise<{
    latest?: string;
  }>;
};

export default async function OrdersRoute({ searchParams }: OrdersRouteProps) {
  const { latest } = await searchParams;

  return (
    <StorefrontShell>
      <OrdersPage latestOrderId={latest ?? null} />
    </StorefrontShell>
  );
}
