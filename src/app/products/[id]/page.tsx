import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/storefront/ProductDetailPage";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";
import { storefrontProducts } from "@/components/storefront/storefront-data";

type ProductDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailRoute({
  params,
}: ProductDetailRouteProps) {
  const { id } = await params;
  const productExists = storefrontProducts.some((product) => product.id === id);

  if (!productExists) {
    notFound();
  }

  return (
    <StorefrontShell>
      <ProductDetailPage productId={id} />
    </StorefrontShell>
  );
}
