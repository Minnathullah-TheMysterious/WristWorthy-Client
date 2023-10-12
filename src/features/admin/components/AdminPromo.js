import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPromoAsync,
  updatePromoAsync,
  updatePromoImageAsync,
} from "../../promo/promoSlice";
import { Modal } from "antd";
import { Link } from "react-router-dom";

const AdminPromo = () => {
  const dispatch = useDispatch();
  const promo = useSelector((state) => state?.promo?.item);
  const brands = useSelector((state) => state?.product?.brands);
  const categories = useSelector((state) => state?.product?.categories);

  const [imageIndex, setImageIndex] = useState(-1);
  const [isPromoImageEditModalOpen, setIsPromoImageEditModalOpen] =
    useState(false);
  const [isPromoEditModalOpen, setIsPromoEditModalOpen] = useState(false);
  const [updatePromoImageData, setUpdatePromoImageData] = useState(null);
  const [promoImagePath, setPromoImagePath] = useState("");
  const [promoImageName, setPromoImageName] = useState("");
  const [brand, setBrand] = useState(promo?.category ? promo.category._id : "");
  const [category, setCategory] = useState(promo?.brand ? promo.brand._id : "");
  const [promo_heading, setPromo_heading] = useState(promo?.promo_heading);
  const [disableBrand, setDisableBrand] = useState(false);
  const [disableCategory, setDisableCategory] = useState(false);

  console.log("brand:", brand);
  console.log("category:", category);
  console.log(promo_heading);

  useEffect(() => {
    dispatch(fetchPromoAsync());
  }, [dispatch]);

  console.log(promo);

  const showPromoImageEditModal = () => {
    setIsPromoImageEditModalOpen(true);
    setIsPromoEditModalOpen(false);
  };

  const showPromoEditModal = () => {
    setIsPromoImageEditModalOpen(false);
    setIsPromoEditModalOpen(true);
  };

  const handlePromoImageEditOk = async () => {
    setIsPromoImageEditModalOpen(false);
    const formData = new FormData();
    formData.append("image", updatePromoImageData);
    dispatch(updatePromoImageAsync({ formData, imageIndex })).then(() => {
      setUpdatePromoImageData(null);
    });
  };

  let data = { promo_heading };
  if (!promo?.brand) {
    data.category = category;
  }
  if (!promo?.category) {
    data.brand = brand;
  }
  console.log(data);

  const handlePromoEditOk = async () => {
    setIsPromoEditModalOpen(false);
    dispatch(updatePromoAsync(data));
  };

  const handlePromoImageEditCancel = () => {
    setIsPromoImageEditModalOpen(false);
  };

  const handlePromoEditCancel = () => {
    setIsPromoEditModalOpen(false);
  };

  return promo ? (
    <div className="overflow-hidden bg-gray-500 py-36">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-white text-4xl font-bold tracking-tight font-serif sm:text-6xl">
              {promo.promo_heading}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn't care if you live or die.
            </p>
          </div>
          <div className="mt-10">
            {/* Decorative image grid */}
            <div
              aria-hidden="true"
              className="lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div
                      onClick={() => {
                        showPromoImageEditModal();
                        setImageIndex(0);
                        setPromoImagePath(promo?.images[0]?.location);
                        setPromoImageName(promo.images[0].originalname);
                      }}
                      className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 hover:cursor-pointer hover:opacity-80 active:opacity-100"
                    >
                      <img
                        src={promo?.images[0]?.location}
                        alt={
                          promo.category
                            ? promo?.category?.category_name
                            : promo?.brand?.brand_name
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div
                      onClick={() => {
                        showPromoImageEditModal();
                        setImageIndex(1);
                        setPromoImagePath(promo?.images[1]?.location);
                        setPromoImageName(promo?.images[1]?.originalname);
                      }}
                      className="h-64 w-44 overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-80 active:opacity-100"
                    >
                      <img
                        src={promo?.images[1]?.location}
                        alt={
                          promo.category
                            ? promo?.category?.category_name
                            : promo?.brand?.brand_name
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div
                      onClick={() => {
                        showPromoImageEditModal();
                        setImageIndex(2);
                        setPromoImagePath(promo?.images[2]?.location);
                        setPromoImageName(promo?.images[2]?.originalname);
                      }}
                      className="h-64 w-44 overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-80 active:opacity-100"
                    >
                      <img
                        src={promo?.images[2]?.location}
                        alt={
                          promo.category
                            ? promo?.category?.category_name
                            : promo?.brand?.brand_name
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div
                      onClick={() => {
                        showPromoImageEditModal();
                        setImageIndex(3);
                        setPromoImagePath(promo?.images[3]?.location);
                        setPromoImageName(promo?.images[3]?.originalname);
                      }}
                      className="h-64 w-44 overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-80 active:opacity-100"
                    >
                      <img
                        src={promo?.images[3]?.location}
                        alt={
                          promo.category
                            ? promo?.category?.category_name
                            : promo?.brand?.brand_name
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div
                      onClick={() => {
                        showPromoImageEditModal();
                        setImageIndex(4);
                        setPromoImagePath(promo?.images[4]?.location);
                        setPromoImageName(promo?.images[4]?.originalname);
                      }}
                      className="h-64 w-44 overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-80 active:opacity-100"
                    >
                      <img
                        src={promo?.images[4]?.location}
                        alt={
                          promo.category
                            ? promo?.category?.category_name
                            : promo?.brand?.brand_name
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div
                      onClick={() => {
                        showPromoImageEditModal();
                        setImageIndex(5);
                        setPromoImagePath(promo?.images[5]?.location);
                        setPromoImageName(promo?.images[5]?.originalname);
                      }}
                      className="h-64 w-44 overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-80 active:opacity-100"
                    >
                      <img
                        src={promo?.images[5]?.location}
                        alt={
                          promo.category
                            ? promo?.category?.category_name
                            : promo?.brand?.brand_name
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div
                      onClick={() => {
                        showPromoImageEditModal();
                        setImageIndex(6);
                        setPromoImagePath(promo?.images[6]?.location);
                        setPromoImageName(promo?.images[6]?.originalname);
                      }}
                      className="h-64 w-44 overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-80 active:opacity-100"
                    >
                      <img
                        src={promo?.images[6]?.location}
                        alt={
                          promo.category
                            ? promo?.category?.category_name
                            : promo?.brand?.brand_name
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <Modal
                    open={isPromoImageEditModalOpen}
                    onOk={handlePromoImageEditOk}
                    onCancel={handlePromoImageEditCancel}
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
                    <form
                      className="space-y-5"
                      onSubmit={handlePromoImageEditOk}
                    >
                      <h1 className="text-center font-serif font-bold text-xl">
                        Change Promo Image
                      </h1>
                      <div className="space-y-2">
                        {updatePromoImageData === null && (
                          <div className="flex justify-center">
                            <img
                              src={promoImagePath}
                              alt="..."
                              className="h-52 w-52 "
                            />
                          </div>
                        )}
                        {updatePromoImageData && (
                          <div className="flex justify-center">
                            <img
                              src={URL.createObjectURL(updatePromoImageData)}
                              alt={updatePromoImageData?.name}
                              className="h-52 w-52 "
                            />
                          </div>
                        )}
                        <label
                          htmlFor="promo_image"
                          className="bg-blue-800 block text-white py-1 text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800"
                        >
                          {!updatePromoImageData
                            ? promoImageName
                            : updatePromoImageData?.name}
                          <input
                            type="file"
                            id="promo_image"
                            name="promo_image"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              setUpdatePromoImageData(e.target.files[0]);
                            }}
                          />
                        </label>
                      </div>
                    </form>
                  </Modal>
                </div>
              </div>
            </div>

            <div className="relative sm:flex sm:flex-row sm:justify-start sm:space-x-2">
              <button className="block my-4">
                <Link
                  to={"/dashboard/admin/create-promo"}
                  className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 hover:cursor-pointer"
                >
                  CHANGE PROMO
                </Link>
              </button>

              <button
                onClick={() => {
                  showPromoEditModal();
                }}
                className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 hover:cursor-pointer"
              >
                EDIT PROMO
              </button>
            </div>

            <Modal
              open={isPromoEditModalOpen}
              onOk={handlePromoEditOk}
              onCancel={handlePromoEditCancel}
              okText={"Update"}
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
              <form className="space-y-5" onSubmit={handlePromoEditOk}>
                <h1 className="text-center font-serif font-bold text-xl">
                  Edit Promo
                </h1>

                <div className="space-y-2">
                  {promo.brand && (
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Brand
                      </label>
                      <div className="mt-2">
                        <select
                          disabled={disableBrand}
                          id="brand"
                          name="brand"
                          autoComplete="brand"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={brand}
                          onChange={(e) => {
                            setBrand(e.target.value);
                            setDisableCategory(true);
                          }}
                        >
                          {brands?.map((brand) => (
                            <option key={brand._id} value={brand._id}>
                              {brand.brand_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {promo.category && (
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <select
                          disabled={disableCategory}
                          id="category"
                          name="category"
                          autoComplete="category"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                            setDisableBrand(true);
                          }}
                        >
                          {categories?.map((myCategory) => (
                            <option key={myCategory._id} value={myCategory._id}>
                              {myCategory.category_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Promo Title
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                        <input
                          type="text"
                          name="productName"
                          id="productName"
                          autoComplete="productName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Buy Your Favorite Smart Phones From Your Favorite Categories"
                          value={promo_heading}
                          onChange={(e) => setPromo_heading(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default AdminPromo;
