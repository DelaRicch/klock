import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/shared/button/button.component';
import { InputComponent } from '@components/shared/input/input.component';
import { SelectComponent } from '@components/shared/select/select.component';
import { SvgIconComponent } from '@components/shared/svg-icon/svg-icon.component';
import { ProductService } from '@services/product/product.service';
import { AddProductProps, ProductGalleryImage } from '@type/types';

@Component({
  selector: 'klock-add-product',
  standalone: true,
  imports: [InputComponent, SvgIconComponent, ButtonComponent, SelectComponent],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
productService = inject(ProductService);

isSubmitting = signal(false);

  addProductForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productDescription: new FormControl(''),
    productCategory: new FormControl('', [Validators.required]),
    productPrice: new FormControl<null | number>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    productDiscount: new FormControl<number>(0),
    productQuantity: new FormControl<null | number>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    productBrandName: new FormControl('', [
      Validators.required,
    ]),
    productCoverImage: new FormControl<File | null>(null, [
      Validators.required,
    ]),
    productGalleryImages: this.createGalleryImagesControl(4),
  });

  categoryOptions = ['male', 'female'];

  @HostBinding('class') get hostClass() {
    return 'border-2 border-red-500 p-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full overflow-y-auto';
  }

  createGalleryImagesControl(count: number): FormArray {
    const controls = Array.from(
      { length: count },
      (_, i) =>
        new FormControl<ProductGalleryImage>({
          id: `gallery-image-${i + 1}`,
          image: null,
        })
    );
    return new FormArray(controls);
  }

  updateCoverImage(val: File | null) {
    this.addProductForm.controls.productCoverImage.setValue(val);
  }

  updateGalleryImages(val: File | null, id: string) {
    this.addProductForm.controls.productGalleryImages.controls.forEach(
      (control) => {
        if (id === control.value?.id) {
          control.setValue({ id: id, image: val });
        }
      }
    );
  }

  addProducts() {

    this.isSubmitting.set(true);

    // const addProduct: AddProductProps = {
    //   productBrand: this.addProductForm.value.productBrandName as string,
    //   productCategory: this.addProductForm.value.productCategory as string,
    //   productCoverImage: this.addProductForm.value.productCoverImage as File,
    //   productDescription: this.addProductForm.value
    //     .productDescription as string,
    //   productDiscountPercentage: this.addProductForm.value
    //     .productDiscount as number,
    //   productGalleryImages: this.addProductForm.value.productGalleryImages,
    //   productName: this.addProductForm.value.productName as string,
    //   productPrice: this.addProductForm.value.productPrice as number,
    //   productQuantity: this.addProductForm.value.productQuantity as number,
    // };



    const formData = new FormData()
    for (const field in this.addProductForm.value) {
      if (field === "productGalleryImages") {
        this.addProductForm.value[field].forEach((image: ProductGalleryImage) => {
          formData.append(field, image.image as File);
        });
      } else {
        const control = this.addProductForm.get(field) as FormControl<string | File | null>;
        const value = control.value;
        if (value !== null) {
          formData.append(field, value);
        }
      }
    }


    // const formData = new FormData();
    // for (const field in this.addProductForm.controls) {
    //   if (field === 'productGalleryImages') {
    //     const galleryImagesControl = this.addProductForm.get('productGalleryImages') as FormArray;
    //     galleryImagesControl.value.forEach((image: ProductGalleryImage) => {
    //       if (image.image) {
    //         formData.append(field, image.image as File);
    //       }
    //     });
    //   } else {
    //     const control = this.addProductForm.get(field) as FormControl<string | File | null>;
    //     const value = control.value;
    //     if (value !== null) {
    //       formData.append(field, value);
    //     }
    //   }
    // }

    this.productService.addProduct(formData).subscribe({
      next: (data) => {
        console.log(data, "data after creating product")
      },
      error: (err) => {
        console.error(err, "error after creating product");
          
      },
      complete: () => {
          this.isSubmitting.set(false);
      },
    })
  }

  ngOnInit(): void {}
}
