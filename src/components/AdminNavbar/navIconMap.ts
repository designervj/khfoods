import {
  ArrowRightLeft,
  BoxesIcon,
  Building2,
  CircleDollarSign,
  ClipboardList,
  FileImageIcon,
  FilePlus,
  Footprints,
  Glasses,
  LayoutTemplate,
  type LucideProps,
  Mail,
  Menu,
  Monitor,
  PackageSearch,
  PanelsTopLeft,
  RssIcon,
  Search,
  SendIcon,
  Settings,
  Settings2,
  ShieldUserIcon,
  Star,
  TagIcon,
  Tags,
  TextCursorInput,
  TruckIcon,
  UserCheck,
  UsersRound} from "lucide-react";
import { type CollectionSlug, type GlobalSlug } from "payload";
import { permission } from "process";
import { type ExoticComponent } from "react";

type ExtraNavKeys = "websites/create";

export const navIconMap: Partial<Record<CollectionSlug | GlobalSlug | ExtraNavKeys, ExoticComponent<LucideProps>>> = {
  redirects: ArrowRightLeft,
  forms: TextCursorInput,
  "form-submissions": SendIcon,
  search: Search,
  administrators: ShieldUserIcon,
  roles: UserCheck,
  permission: ShieldUserIcon,
  pages: LayoutTemplate,
  posts: RssIcon,
  media: FileImageIcon,
  categories: TagIcon,
  header: Menu,
  footer: Footprints,
  customers: UsersRound,
  orders: ClipboardList,
  fulfilment: Building2,
  products: PackageSearch,
  productCategories: TagIcon,
  productSubCategories: Tags,
  productReviews: Star,
  emailMessages: Mail,
  shopSettings: Settings,
  shopLayout: PanelsTopLeft,
  "inpost-courier-cod": TruckIcon,
  "inpost-courier": TruckIcon,
  "inpost-pickup": BoxesIcon,
  // paywalls: CircleDollarSign,
  websites: Monitor,
  // presets: FilePlus,
  "websites/create": LayoutTemplate,
  // permission: UserCheck,
  "payment":CircleDollarSign,
  sitesetting: Settings2
};

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug] : undefined;
