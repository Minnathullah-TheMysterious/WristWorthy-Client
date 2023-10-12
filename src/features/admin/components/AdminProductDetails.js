import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedProductAsync,
  updateProductImageAsync,
} from "../../products/productSlice";
import { useParams } from "react-router-dom";
import { Modal } from "antd";
import { DISCOUNTED_PRICE } from "../../../app/constants";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const selectedProduct = useSelector(
    (state) => state?.product?.selectedProduct
  );
  const productId = selectedProduct?._id;

  const [imageIndex, setImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProductImageData, setUpdateProductImageData] = useState(null);
  const [productImagePath, setProductImagePath] = useState("");
  const [productImageName, setProductImageName] = useState("");

  useEffect(() => {
    dispatch(fetchSelectedProductAsync(params.productId));
  }, [dispatch, params.productId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const formData = new FormData();
    formData.append("image", updateProductImageData);
    dispatch(updateProductImageAsync({ productId, formData, imageIndex })).then(
      () => {
        setUpdateProductImageData(null);
        dispatch(fetchSelectedProductAsync(params.productId));
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white">
      {selectedProduct && (
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div
              onClick={() => {
                showModal();
                setImageIndex(0);
                setProductImagePath(`/${selectedProduct?.images[0]?.location}`);
                setProductImageName(selectedProduct.images[0].originalname);
              }}
              className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block hover:cursor-pointer"
            >
              <img
                src={`/${selectedProduct?.images[0]?.location}`}
                alt={selectedProduct?.product_name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              {selectedProduct?.images[1] && (
                <div
                  onClick={() => {
                    setImageIndex(1);
                    showModal();
                    setProductImagePath(
                      `/${selectedProduct?.images[1]?.location}`
                    );
                    setProductImageName(selectedProduct.images[1].originalname);
                  }}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg hover:cursor-pointer"
                >
                  <img
                    src={`/${selectedProduct?.images[1]?.location}`}
                    alt={selectedProduct?.product_name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}
              {selectedProduct?.images[2] && (
                <div
                  onClick={() => {
                    setImageIndex(2);
                    showModal();
                    setProductImagePath(
                      `/${selectedProduct?.images[2]?.location}`
                    );
                    setProductImageName(selectedProduct.images[2].originalname);
                  }}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg hover:cursor-pointer"
                >
                  <img
                    src={`/${selectedProduct?.images[2]?.location}`}
                    alt={selectedProduct?.product_name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}
            </div>
            {selectedProduct?.images[3] && (
              <div
                onClick={() => {
                  setImageIndex(3);
                  showModal();
                  setProductImagePath(
                    `/${selectedProduct?.images[3]?.location}`
                  );
                  setProductImageName(selectedProduct.images[3].originalname);
                }}
                className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg hover:cursor-pointer"
              >
                <img
                  src={`/${selectedProduct?.images[3]?.location}`}
                  alt={selectedProduct?.product_name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={"Update Image"}
              okButtonProps={{
                style: {
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                },
              }}
              cancelButtonProps={{
                style: {
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                },
              }}
            >
              <form className="space-y-5" onSubmit={handleOk}>
                <h1 className="text-center font-serif font-bold text-xl">
                  Change Product Image
                </h1>
                <div className="space-y-2">
                  {updateProductImageData === null && (
                    <div className="flex justify-center">
                      <img
                        src={productImagePath}
                        alt={selectedProduct.product_name || "..."}
                        className="h-52 w-52 "
                      />
                    </div>
                  )}
                  {updateProductImageData && (
                    <div className="flex justify-center">
                      <img
                        src={URL.createObjectURL(updateProductImageData)}
                        alt={updateProductImageData?.name}
                        className="h-52 w-52 "
                      />
                    </div>
                  )}
                  <label
                    htmlFor="product_image"
                    className="bg-blue-800 block text-white py-1 text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800"
                  >
                    {!updateProductImageData
                      ? productImageName
                      : updateProductImageData?.name}
                    <input
                      type="file"
                      id="product_image"
                      name="product_image"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        setUpdateProductImageData(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </form>
            </Modal>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {selectedProduct?.product_name}
              </h1>
              <p
                className={`text-lg font-semibold ${
                  selectedProduct?.stock >= 1 ? "text-blue-600" : "text-red-600"
                }`}
              >
                Available Stock: {selectedProduct?.stock}
              </p>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight">
                <span className="line-through text-gray-400">
                  ${selectedProduct?.price}
                </span>{" "}
                |{" "}
                <span className="text-green-600 font-bold">
                  ${DISCOUNTED_PRICE(selectedProduct)}
                </span>
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating, index) => (
                      <StarIcon
                        key={index}
                        className={classNames(
                          selectedProduct?.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">
                    {selectedProduct?.rating || 4} out of 5 stars
                  </p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {selectedProduct?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {selectedProduct?.highlights?.map((highlight, index) => (
                      <li key={`${index}1`} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductDetails;
