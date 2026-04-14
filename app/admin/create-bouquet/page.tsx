import { getFlowers } from "@/app/admin/dashboard/flowers/actions";
import { getShopSettings } from "@/app/admin/dashboard/settings/actions";
import { CreateBouquetClient } from "@/app/admin/create-bouquet/CreateBouquetClient";

export default async function CreateBouquetPage() {
  const [flowers, shopSettings] = await Promise.all([
    getFlowers(),
    getShopSettings(),
  ]);

  return <CreateBouquetClient flowers={flowers} shopSettings={shopSettings} />;
}
