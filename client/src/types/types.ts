import {BubbleDataPoint, Chart, ChartTypeRegistry, Point, TooltipModel,} from 'chart.js';



export interface ClientOrders {
  [key: string]: string | number;
}

export interface AlertProps {
  status: 'success' | 'error';
  title: string;
  message: string;
  id?: number
}

export interface DropdownItemProp {
  name: string;
  path?: string;
}

export type PaginationItem = number | '...';

export type CtxTypes = {
  chart: Chart<
    keyof ChartTypeRegistry,
    (number | [number, number] | Point | BubbleDataPoint | null)[],
    unknown
  >;
  tooltip: TooltipModel<'line'>;
};

export type TableHeader = {
[key: string]: string;
};

export interface AddProductProps {
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: number;
  productDiscountPercentage: number;
  productQuantity: number;
  productBrand: string;
  productCoverImage: File;
  productGalleryImages: File[]
}

export interface ProductGalleryImage {
  id: string;
  image: File | null;
}

export interface AdminAllProductsType {
  // data: {
    AdminAllProducts: AdminAllProducts[]
  // }
}

export interface AdminAllProducts {
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: number;
  productDiscountPercentage: number;
  productQuantity: number;
  productBrand: string;
  productCoverImage: string;
  productId: string;
  productsRemaining: number;
  productsSold: number;
}
