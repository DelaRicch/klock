import {Component, HostBinding, inject, OnInit, signal} from '@angular/core';
import {AddProductComponent} from '@components/admin/all-products/add-product/add-product.component';
import {SingleItemCardComponent} from '@components/admin/all-products/single-item-card/single-item-card.component';
import {ButtonComponent} from '@components/shared/button/button.component';
import {SvgIconComponent} from '@components/shared/svg-icon/svg-icon.component';
import {AdminAllProductsType} from "@type/types";
import {Apollo} from "apollo-angular";
import {DISPLAY_ALL_ADMIN_PRODUCTS} from "@graphql/admin-products.queries";
import {AlertService} from "@services/alert/alert.service";

@Component({
  selector: 'klock-all-products',
  standalone: true,
  imports: [
    ButtonComponent,
    SingleItemCardComponent,
    SvgIconComponent,
    AddProductComponent,
  ],
  template: `
    <div class="flex justify-between items-center px-2.5">
      <h2 class="text-2xl font-semibold capitalize">all products</h2>
      <!-- <klock-button
        (click)="addProduct.set(!addProduct())"
        [isRipple]="true"
        [label]="addProduct() ? 'go back' : 'add new product'"
        className="font-bold capitalize bg-[#1D2939] w-max"
      >
        @if (addProduct()) {
          <klock-svg-icon class="transform -rotate-90" svgName="arrow-up" stroke="#FFFFFF"></klock-svg-icon>
        } @else {
          <klock-svg-icon svgName="plus-filled" color="#FFFFFF"></klock-svg-icon>
        }
      </klock-button> -->
    </div>

    @if (addProduct()) {
      <klock-add-product></klock-add-product>
    } @else {
      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 h-full overflow-y-auto"
      >
        @for (product of products()?.AdminAllProducts; track product.productId) {
        <klock-single-item-card
          [productName]="product.productName"
          [productDescription]="''"
          [productSummary]="product.productDescription"
          [totalProducts]="product.productQuantity"
          [productSales]="product.productsSold"
          [productPrice]="product.productPrice"
          [productImage]="product.productCoverImage"
        ></klock-single-item-card>
        }
      </section>
    }
  `,
})
export class AllProductsComponent implements OnInit {
  addProduct = signal(false);
  products = signal<AdminAllProductsType | null>(null)
  apollo = inject(Apollo);
  alertService = inject(AlertService)


  @HostBinding('class') get HostClass() {
    return 'container flex flex-col gap-8 pt-5 pb-3 px-4';
  }

  ngOnInit() {
    this.apollo.query({
        query: DISPLAY_ALL_ADMIN_PRODUCTS,
      }
    )
      .subscribe(({data}) => {
        if (data) {
          this.products.set(data as AdminAllProductsType)
        }

      });
  }
}
