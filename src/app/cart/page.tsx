import { CartPage } from "@/components/storefront/CartPage";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

export default function CartRoute() {
  return (
    <StorefrontShell>
      <CartPage />
    </StorefrontShell>
  );
}
