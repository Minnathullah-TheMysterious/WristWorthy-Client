# WristWorthy

### Table of Contents

1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Getting Started](#3-getting-started)
4. [Project Structure](#4-project-structure)
5. [Features](#5-features)

## 1. Introduction

"WristWorthy" is an e-commerce web application built using Create React App. This documentation provides an overview of the application, its features, and how to use it effectively.

## 2. Prerequisites

Before you get started with "WristWorthy," ensure you have the following prerequisites in place:

- Node.js and npm installed on your machine.
- A text editor or integrated development environment (IDE).
- A basic understanding of React and web development.

## 3. Getting Started

To get the WristWorthy app up and running on your local machine, follow the steps outlined in this section. <br>
**Installation**

1. Clone the repository to your local machine using [Git](https://git-scm.com/) :

```bash
   git clone https://github.com/Minnathullah-TheMysterious/wristworthy-client.git
```

2. Change your working directory to the project's folder:

```bash
   cd wristworthy-client
```

3. Install project dependencies:

```bash
   npm install
```

**Configuration**

1. In the project directory, create a `.env` file for environment variables.

```.env
   REACT_APP_STRIPE_PUBLISHABLE_KEY = provide_your_stripe_publish_key
```

2. Configure you server

- For configuring server please go through [WristWorthy Server](https://github.com/Minnathullah-TheMysterious/wristworthy-server)
- Install the server as given in the installation section of the sever.

**Usage** <br>
Start the development server and run the app:

```bash
  npm start
```

Your app should now be accessible at `http://localhost:3000`. The development server will also provide hot-reloading for a smooth development experience.

**Deployment**
To build the app for production, use:

```bash
  npm run build
```

This command generates a `build` folder that contains the optimized, production-ready assets.

## 4. Project Structure

The project structure of this React app, "WristWorthy" follows a commonly used directory structure to maintain code organization and separation of concerns. Here's an overview of the key directories and their purposes:

- `public/`: This directory contains the public assets and the HTML template file used as the entry point for the application.
  - `index.html`: The main HTML template that serves as the entry point for the app. You can customize this file to add meta tags, title, and more.
  - `images/`: The images folder contains images for spinner and company logos, etc.
- `src/`: This is the heart of the application, containing all the source code.
  - `app/`: The folder houses core components and functionality that drive our application. It includes the following key files and directories:
    - `constants.js`: The file contains application-level constants and configuration values, such as product limit per page for users as well as admins and a function to calculate discounted price.
    - `pricing.js`: It consists The `Prices` constant which is an array of objects that represents different price ranges. Each object in the array has three properties. This is used for product filtering as per the price range
    - `store.js`: The file file is the heart of our application's state management. It configures and creates the Redux store, which centralizes and manages the application's state, enabling predictable and efficient data flow throughout the application.
  - `loaders/`: The folder is a crucial part of our application, dedicated to inform the user about the ongoing process. It contains the following files and components:
    - `AdminCheckLoader.js`: The component is an essential part of our application, designed to handle authorization and access control for administrators. This component serves as a checkpoint loader, ensuring that only authorized administrators can access specific administrative features and sections of the application.
    - `Loader.js`: The component is a fundamental part of our application's user interface, designed to display loading indicators or spinners during data retrieval or asynchronous operations. This component ensures that users are informed of ongoing processes and provides a better user experience.
    - `TopLoadBar.js`: The component is a fundamental part of our application's user interface, designed to display top loading bar during data retrieval or asynchronous operations. This component ensures that users are informed of ongoing processes and provides a better user experience.
  - `routes/`: The folder is a crucial part of our application, dedicated to protecting the admin and user routes. It contains the following files and components:  
    - `AdminProtectedRoute.js`: The component is a critical part of our application's routing and access control system, specifically designed to protect and secure administrative routes. This component serves as a safeguard, ensuring that only authorized administrators can access designated administrative views.
    - `UserProtectedRoute.js`: The component is a critical part of our application's routing and access control system, specifically designed to protect and secure user routes. This component serves as a safeguard, ensuring that only authorized users can access designated user views.
  - `features/`: Th folder serves as the central repository for implementing and organizing the key features of our application. Each feature is encapsulated within its own directory to maintain code modularity and separation of concerns. Here is an overview of the features and their respective components:
    - `layout/`: The folder is a crucial part of our application, dedicated to managing the layout of the whole application. It contains the following files and components:
      - `Header.js`: The component is a crucial part of our application's user interface, responsible for rendering the top navigation bar of the application. It displays all the navigation buttons, allows users to navigate through pages effortlessly.
      - `Footer.js`: The component is a crucial part of our application's user interface, responsible for rendering the bottom navigation bar. It displays the navigation buttons, allows users to navigate through pages seamlessly.
      - `Layout.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the Layout of the whole application. It consists of `Navbar.js` and `Footer.js` and uses `children` for other components to render. `react-helmet` is used for providing the each page title, author, description and keywords. This component is used everywhere where the layout was required.
    - `products/`: The folder is a crucial part of our application, dedicated to managing the product functionality. It contains the following files and components:
      - `components/`:
        - `ProductListing.js`: The component is a crucial part of our application's user interface, responsible for rendering the products. It displays the list of products(non-deleted) with the options of filtering and sorting, allows users to shop from their favorite brands and categories, and also narrows down the products according to the budget by selecting a price range. Users can also save their favorite items in the wishlist.
        - `ProductDetails.js`: The component is a crucial part of our application's user interface, responsible for rendering product details. It displays the product details of the particular product, in addition with a 'Add To Cart' button and showing all the related products of the current product as per the category, allows users to add item to cart.
      - `productAPI.js`: The file serves as the data source and API interface for fetching the products, brands and categories in our application. It defines a set of functions and methods to perform various operations related to the products, brands and categories, such as fetching products (selected product, related products, searched product(s)), brands and categories.
      - `productSlice.js`: The file is a Redux slice that manages the products, brands and categories state in the application. It defines reducers, actions, and selectors for interacting with and managing the products, brands and categories state. This slice is integrated into the Redux store to provide a centralized place for products, brands and categories state management.
    - `promo/`: The folder is a crucial part of our application, dedicated to managing the promo functionality. It contains the following files and components:
      - `Promo.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the promo. It displays the promo images and a button to shop collection, allows users to shop directly from the collection .
      - `promoAPI.js`: The file serves as the data source and API interface for managing the promo in our application. It defines a  function to fetch the promo.
      - `promoSlice.js`: The file is a Redux slice that manages the promo state in the application. It defines reducers, actions, and selectors for interacting with and managing the promo. This slice is integrated into the Redux store to provide a centralized place for promo state management.
    - `auth/`: The folder is a crucial part of our application, dedicated to managing the authentication functionality. It contains the following files and components:
      - `components/`:
        - `Register.js`: The component is a crucial part of our application's user interface, responsible for registering the user. It displays the form to register the user, allows users to register the user.
        - `Login.js`: The component is a crucial part of our application's user interface, responsible for logging in the user. It displays the form to login the user, allows users to login the user.
        - `PassReset.js`: The component is a crucial part of our application's user interface, responsible for managing password reset through OTP sent via SMS. It displays the form to set the password, allows users to reset the password.
        - `PassResetMail.js`: The component is a crucial part of our application's user interface, responsible for managing password reset through link sent to mail. It displays the form to set the password, allows users to reset the password.
      - `authAPI.js`: The file serves as the data source and API interface for managing the authentication in our application. It defines a set of functions and methods to perform various operations related to the authentication, such as register, login, logout and password reset etc,.
      - `authSlice.js`: The file is a Redux slice that manages the authentication state in the application. It defines reducers, actions, and selectors for interacting with and managing the authentication state. This slice is integrated into the Redux store to provide a centralized place for authentication state management.
    - `cart/`: The folder is a crucial part of our application, dedicated to managing the shopping cart functionality. It contains the following files and components:
      - `Cart.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the shopping cart. It displays the list of items in the cart, allows users to modify item quantities, and shows the total cost of the items in the cart.
      - `cartAPI.js`: The file serves as the data source and API interface for managing the shopping cart in our application. It defines a set of functions and methods to perform various operations related to the cart, such as adding items, removing items, fetching user cart items and update cart item quantity.
      - `cartSlice.js`: The file is a Redux slice that manages the shopping cart state in the application. It defines reducers, actions, and selectors for interacting with and managing the cart state. This slice is integrated into the Redux store to provide a centralized place for cart state management.
    - `wishlist/`: The folder is a crucial part of our application, dedicated to managing the wishlist functionality. It contains the following files and components:
      - `Wishlist.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the wishlist. It displays the list of items in the wishlist, allows users to remove product from the quantity.
      - `wishlistAPI.js`: The file serves as the data source and API interface for managing the Wishlist in our application. It defines a set of functions and methods to perform various operations related to the wishlist, such as adding items, removing items, and fetching the wishlist items.
      - `wishlistSlice.js`: The file is a Redux slice that manages the Wishlist state in the application. It defines reducers, actions, and selectors for interacting with and managing the Wishlist state. This slice is integrated into the Redux store to provide a centralized place for wishlist state management.
    - `checkout/`: The folder is a crucial part of our application, dedicated to managing the checkout functionality. It contains the following files and components:
      - `Checkout.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the checkout process. It displays the list of items in the cart for checkout, saved shipping addresses of the user alongside a form to add a new shipping address and the methods of payment allows users to modify item quantities, shows the total cost of the items in the cart for checkout, select a shipping address from the existing one or add a new one and two payment methods to choose from i.e., 'Cash On Delivery' & 'Card'.
    - `stripePayment/`: The folder is a crucial part of our application, dedicated to rendering the 'Stripe' payment functionality. It contains the following files and components:
      - `Stripe.css`: The file is responsible for styling of Stripe Checkout form
      - `StripeCheckoutForm.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the card payment from 'Stripe'. It displays the a typical debit/credit card form, allows users to make payment via credit/debit card.
    - `user/`: The folder is a crucial part of our application, dedicated to rendering the user functionalities. It contains the following files and components:
      - `components/`:
        - `AddAddressForm.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the address form. It displays the address form, allows users to add addresses.
        - `ManageUserAddresses.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the user addresses. It displays the addresses with buttons to edit, delete and add addresses, allows users to add addresses, edit and delete exiting addresses.
        - `UserAddresses.js`: The component is a crucial part of our application's user interface, responsible for rendering addresses. It displays the user addresses.
        - `UserOrders.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the orders. It displays the user orders, allows users to cancel order if wanted.
        - `UserProfile.js`: The component is a crucial part of our application's user interface, responsible for rendering and managing the user profile. It displays the user profile, allows users to edit and delete the addresses.
      - `userAPI.js`: The file serves as the data source and API interface for managing the user in our application. It defines a set of functions and methods to perform various operations related to the user, such as getting the user information, adding, deleting and updating addresses and placing, cancelling and fetching user orders.
      - `userSlice.js`: The file is a Redux slice that manages the user state in the application. It defines reducers, actions, and selectors for interacting with and managing the user state. This slice is integrated into the Redux store to provide a centralized place for user state management.
    - `admin/`: The folder is a crucial part of our application, dedicated to rendering the admin functionalities. It contains the following files and components:
      - `components/`:
        - `AdminBrandListing.js`: The component is a crucial part of our application's admin interface, responsible for rendering and managing the brands. It displays the list of brands alongside buttons to edit, delete, add and restore them, allows admin to manage the brands.
        - `AdminCategoryListing.js`: The component is a crucial part of our application's admin interface, responsible for rendering and managing the categories. It displays the list of categories alongside buttons to edit, delete, add and restore them, allows admin to manage the categories.
        - `AdminOrders.js`:The component is a crucial part of our application's admin interface, responsible for rendering and managing all the orders. It displays the list of orders, allows admin to manage the order & payment status, It also allows admin to filter out the orders as per the payment status, order status and payment method with an input box to find a particular order by its ID. It also allows admin to sort the orders as per the order time, last update time, order amount, etc.
        - `AdminProductDetails.js`: The component is a crucial part of our application's admin interface, responsible for rendering and managing the product details. It displays the details of the selected product, allows admin to modify the product images.
        - `AdminProductListing.js`: The component is a crucial part of our application's admin interface, responsible for rendering and managing all the products. It displays the list of products (deleted & non-deleted), allows admin to modify, delete, restore and add the product.
        - `AdminPromo.js`: The component is a crucial part of our application's admin interface, responsible for rendering and managing the promo. It displays the promo, allows admin to modify the promo or change the promo.
        - `CreatePromo.js`: The component is a crucial part of our application's admin interface, responsible for rendering the promo form. It displays the form to create promo, allows admin to create the promo.
        - `ProductForm.js`: The component is a crucial part of our application's admin interface,  responsible for rendering the product form. It displays the form to create product, allows admin to create the product.
        - `UpdateProductForm.js`: The component is a crucial part of our application's admin interface,  responsible for rendering the product form. It displays the form to update product, allows admin to update the product.
      - `adminAPI.js`: The file serves as the data source and API interface for managing the admin in our application. It defines a set of functions and methods to perform various operations related to the admin, such as managing the product, category, brand, orders and promos.
      - `adminSlice.js`: The file is a Redux slice that manages the admin state in the application. It defines reducers, actions, and selectors for interacting with and managing the admin state. This slice is integrated into the Redux store to provide a centralized place for admin state management.
  - `pages/`: The folder is a vital part of our application's user interface, responsible for rendering and organizing the various pages or views within our application. Each page component is designed to render feature components from different parts of our application, resulting in a user-friendly and feature-rich experience.
    - `adminPages/`: The folder is a dedicated section of our application's user interface, specifically designed for administrative purposes. It houses page components that provide access to administrative features, settings, and functionalities.
      - `AdminBrandsPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for brand management. This component serves as the page view that displays a list of brands, allows administrators to perform brand-related actions, by providing access to the `AdminBrandListing` component for detailed brand management.
      - `AdminCategoriesPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for category management. This component serves as the page view that displays a list of categories, allows administrators to perform category-related actions, by providing access to the `AdminCategoryListing` component for detailed category management.
      - `AdminOrdersPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for order management. This component serves as the page view that displays a list of orders, allows administrators to perform order-related actions, by providing access to the `AdminOrders` component for detailed order management.
      - `AdminProductDetailsPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for product details management. This component serves as the page view that displays a details of product, allows administrators to perform product-related actions, by providing access to the `AdminProductDetails` component for detailed product details management.
      - `AdminProductsPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for product management. This component serves as the page view that displays a list of products, allows administrators to perform product-related actions, by providing access to the `AdminProductListing` component for detailed product management.
      - `CreateProductPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for creating product. This component serves as the page view that displays form to create product, allows administrators to create product, by providing access to the `ProductForm` component for creating product.
      - `CreatePromoPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for creating promo. This component serves as the page view that displays form to create promo, allows administrators to create promo, by providing access to the `CreatePromo` component for creating promo.
      - `UpdateProductPage.js`: The component is a crucial part of our application's administrative interface, specifically designed for updating the product. This component serves as the page view that displays form to update the product, allows administrators to update, by providing access to the `UpdateProductForm` component for updating product.
    - `footerPages/`: The folder serves as a dedicated section of our application's user interface for rendering footer-related content. It contains page components that display information, links, and features related to the footer of our application.
      - `AboutPage.js`: The component is a key part of our application's user interface, dedicated to providing users with information about our application. This component serves as a page view that offers details about our application, its purpose, and other relevant information.
      - `ContactPage.js`: The component is a key part of our application's user interface, dedicated to providing users with contact information of us. This component serves as a page view that offers contact information.
      - `PrivacyPolicyPage.js`: The component is a fundamental part of our application's user interface, specifically dedicated to providing users with access to our application's privacy policy. This component serves as a page view that displays our privacy policy and ensures transparency regarding the handling of user data.
      - `TermsAndConditionsPage.js`: The component is an essential part of our application's user interface, specifically dedicated to providing users with access to our application's terms and conditions. This component serves as a page view that displays the terms and conditions, outlining the rules and guidelines for using our application.
    - `CardPaymentOrderSuccessPage.js`: The component is a pivotal part of our application's user interface, specifically dedicated to providing users with a message after successful order placement by 'Credit/Debit card'. This component serves as a page view that displays the order ID and navigation buttons to navigate to 'Home' & 'My Orders'.  
    - `CartPage.js`: The component is a pivotal part of our application's user interface, specifically dedicated to providing users with access to their shopping cart. This component serves as a page view that displays the contents of the user's shopping cart, allowing them to review and manage their selected items, by providing access to the `Cart` component.
    - `CashPaymentOrderSuccessPage.js`: The component is a pivotal part of our application's user interface, specifically dedicated to providing users with a message after successful order placement by 'Cash On Delivery'. This component serves as a page view that displays the order ID and navigation buttons to navigate to 'Home' & 'My Orders'.
    - `CheckoutPage.js`: The component is a vital part of our application's user interface, specifically dedicated to managing the checkout process. This component serves as a page view that displays the Checkout component, allowing users to complete their purchase and provide necessary information for delivery and payment.
    - `Home.js`: The component serves as the main entry point for our application, catering to both regular users and administrators. This component displays a dynamic view that showcases promotional content and product listings for users while providing administrative users access to manage promotional items, categories, brands, and product listings.
    - `LoginPage.js`: The component is a critical part of our application's user interface, dedicated to providing users with access to the authentication process. This component serves as a page view that displays the `Login` component, allowing users to log in and access their accounts.
    - `PageNotFound.js`: The component plays an important role in our application's public interface by providing a clear and user-friendly "Page Not Found" message to users when they attempt to access non-existent or invalid pages. This component ensures a positive user experience by guiding users back to valid pages.
    - `PassResetMailPage.js`: The component is a critical part of our application's user interface, dedicated to providing users with access to reset their password through a link sent to them via mail. This component serves as a page view that displays the `PassResetMail` component, allowing users to Reset their password.
    - `PassResetPage.js`: The component is a critical part of our application's user interface, dedicated to providing users with access to reset their password by verifying an OTP sent to them via SMS. This component serves as a page view that displays the `PassReset` component, allowing users to Reset their password.
    - `ProductDetailsPage.js`: The component is a crucial part of our application's public interface, specifically designed for rendering product details. This component serves as the page view that displays a details of product, allows users to add product to cart, by providing access to the `ProductDetails` component for detailed product details.
    - `RegisterPage.js`: The component is a significant part of our application's public interface, dedicated to facilitating user registration and account creation. This component serves as a page view that displays the `Register` component, allowing users to sign up and create their accounts.
    - `StripeCheckoutPage.js`: The component is a crucial part of our application's user interface, specifically designed for handling payments through the Stripe payment platform. This component serves as a page view that displays the `StripeCheckoutForm` component, allowing users to securely make payments for products.
    - `UserAddressesPage.js`: The component is a crucial part of our application's user interface, specifically designed to enable users to view their addresses & managing them. This component serves as the page view that displays a list of addresses, allows user to perform address-related actions, by providing access to the `ManageUserAddresses` component for detailed address management.
    - `UserOrdersPage.js`: The component is an integral part of our application's user interface, specifically designed to enable users to view their order history. This component serves as a page view that displays the UserOrders component, allowing users to access their past orders, track order statuses, and review order details.
    - `UserProfilePage.js`: The component is a key element of our application's user interface, dedicated to enabling users to view and manage their user profile information. This component serves as a page view that displays the UserProfile component, allowing users to review and edit their profile details.
    - `WishlistPage.js`: The component is a pivotal part of our application's user interface, specifically dedicated to providing users with access to their wishlist. This component serves as a page view that displays the contents of the user's wishlist, allowing them to review and manage their favorite items, by providing access to the `Wishlist` component.
  - `App.js`: The main application component where the routing is handled.
  - `index.js`: The entry point for the React application, which renders the main App component to the DOM.
  - `index.css`: The file is a fundamental part of our application's styling, responsible for defining global CSS styles using the Tailwind CSS framework. It incorporates styles for base elements, components, and utility classes, ensuring a consistent and responsive design across the entire application.
  - `reportWebVitals.js`: The file is an important part of our application's performance monitoring and reporting system. It is used to track and report various web performance metrics, providing insights into the application's performance, user experience, and potential areas for optimization. <br>
    **Usage:** <br>
     The reportWebVitals.js file captures and reports web performance metrics, including: <br>
     - Largest Contentful Paint (LCP): Measures the loading performance of the largest content element on the page.
     - First Input Delay (FID): Evaluates the responsiveness and interactivity of the application by measuring the delay between the user's first interaction and the application's response.
     - Cumulative Layout Shift (CLS): Quantifies the visual stability of the page by measuring unexpected layout shifts.
     - Total Blocking Time (TBT): Reflects the amount of time during which the main thread is blocked, affecting the application's responsiveness.
     - Time to First Byte (TTFB): Indicates the time it takes to receive the first byte of content from the server.
     - Element-specific metrics: You can use reportWebVitals.js to report custom performance metrics specific to your application.
- `tailwind.config.js`: The file is a pivotal part of our application's styling and design system, serving as the configuration file for the Tailwind CSS framework. This file provides the ability to customize and tailor the application's styling, typography, colors, and responsive breakpoints, enabling a unique and visually appealing design.
- `.gitignore`: The file is a crucial component of our project's version control system and repository management. It specifies which files and directories should be excluded from version tracking and should not be included in the Git repository. This file is essential for maintaining a clean and efficient version control system.
- `.env`: The file is a critical component of our project's configuration and environment management. It is used to store sensitive and environment-specific configuration variables, secrets, and settings, ensuring the security and flexibility of our application.<br>
  It has the following variable:
    ```bash 
      REACT_APP_STRIPE_PUBLISHABLE_KEY = your-stripte-publishable-key
    ```
- `package-lock.json`: The file is an essential part of our project's dependency management and package resolution process. It records specific versions of dependencies and their sub-dependencies, ensuring the consistency and reliability of our project's environment.
- `node_modules`: The directory is a fundamental part of our project's development environment. It houses all the external dependencies and libraries required for our application to function. These dependencies are managed by package managers like npm or Yarn and provide essential functionality for our project.
- `build`: The folder is a crucial component of our React application's build process. It contains the optimized, production-ready version of our application, ready for deployment to web servers, content delivery networks (CDNs), or cloud hosting services. The files in this folder are the result of the build process and are meant for end-users to access the application.
