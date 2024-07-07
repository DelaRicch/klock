import {gql} from "apollo-angular";

export const DISPLAY_ALL_ADMIN_PRODUCTS = gql`
  query AdminAllProducts {
    AdminAllProducts {
      productName
      productDescription
      productCategory
      productPrice
      productDiscountPercentage
      productQuantity
      productBrand
      productCoverImage
      productId
      productsRemaining
      productsSold
    }
  }
`;
