import React, { useState } from "react";
import { Button, Modal, Badge, Space } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrandAsync,
  deleteBrandAsync,
  restoreBrandAsync,
  updateBrandImageAsync,
  updateBrandNameAsync,
} from "../../products/productSlice";

const { confirm } = Modal;

const AdminBrandListing = ({ wrapClass }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state?.product?.brands);

  const [isCreateBrandModalOpen, setIsCreateBrandModalOpen] = useState(false);
  const [isUpdateBrandNameModalOpen, setIsUpdateBrandNameModalOpen] =
    useState(false);
  const [isUpdateBrandImageModalOpen, setIsUpdateBrandImageModalOpen] =
    useState(false);
  const [brandImagePreview, setBrandImagePreview] = useState(null);
  const [incomingImage, setIncomingImage] = useState(null);
  const [brand_image, setBrand_image] = useState(null);
  const [brand_name, setBrand_name] = useState("");
  const [brandId, setBrandId] = useState("");
  const [createBrand, setCreateBrand] = useState(false);
  const [updateBrandName, setUpdateBrandName] = useState(false);

  const showDeleteConfirm = (brandName, brandId) => {
    confirm({
      title: `Are you sure to delete the '${brandName}' brand?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content:
        "Be Careful! All The Filters and all the related products etc., may not work expectedly. You can restore it anytime",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteBrandAsync(brandId));
      },
      onCancel() {},
    });
  };

  const showRestoreConfirm = (brandName, brandId) => {
    confirm({
      title: `Are you sure to Restore  the'${brandName}' brand?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content: "You can delete the brand anytime you wanted.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(restoreBrandAsync(brandId));
      },
      onCancel() {
      },
    });
  };

  const showCreateBrandModal = () => {
    setIsCreateBrandModalOpen(true);
  };
  const showUpdateBrandNameModal = () => {
    setIsUpdateBrandNameModalOpen(true);
  };
  const showUpdateBrandImageModal = () => {
    setIsUpdateBrandImageModalOpen(true);
  };
  const handleOk = () => {
    if (createBrand && !updateBrandName) {
      setIsCreateBrandModalOpen(false);
      const formData = new FormData();
      formData.append("brand_name", brand_name);
      formData.append("image", brand_image);
      dispatch(createBrandAsync(formData));
    } else if (!createBrand && updateBrandName) {
      setIsUpdateBrandNameModalOpen(false);
      dispatch(updateBrandNameAsync({ brandId, brand_name }));
    } else if (!createBrand && !updateBrandName) {
      setIsUpdateBrandImageModalOpen(false);
      const formData = new FormData();
      formData.append("image", incomingImage);
      dispatch(updateBrandImageAsync({ brandId, formData }));
    }
  };
  const handleCancel = () => {
    if (createBrand && !updateBrandName) {
      setIsCreateBrandModalOpen(false);
    } else if (!createBrand && updateBrandName) {
      setIsUpdateBrandNameModalOpen(false);
    } else if (!createBrand && !updateBrandName) {
      setIsUpdateBrandImageModalOpen(false);
    }
  };

  return (
    <div className="bg-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-3 sm:py-2 lg:max-w-none lg:py-4">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            Brands
          </h2>
          {/* Create Brand Modal */}
          <section>
            <Button
              className="bg-sky-800 text-white min-w-full font-bold font-serif tracking-widest"
              type="primary"
              onClick={() => {
                setCreateBrand(true);
                setUpdateBrandName(false);
                showCreateBrandModal();
              }}
            >
              Add New Brand
            </Button>
            <Modal
              open={isCreateBrandModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={"Create Brand"}
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
                  Create A New Brand
                </h1>
                <label htmlFor="brand_name" className="flex flex-col">
                  <input
                    type="text"
                    id="brand_name"
                    name="brand_name"
                    className="rounded-lg min-h-full"
                    placeholder="Enter Brand Name"
                    onChange={(e) => setBrand_name(e.target.value)}
                  />
                </label>

                <div className="space-y-2">
                  {brand_image && (
                    <div className="flex justify-center">
                      <img
                        src={URL.createObjectURL(brand_image)}
                        alt="category"
                        className="h-52 w-52 "
                      />
                    </div>
                  )}
                  <label
                    htmlFor="brand_image"
                    className="bg-blue-800 block text-white py-1 text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800"
                  >
                    {brand_image
                      ? brand_image.name
                      : "Upload Brand Logo or Image"}
                    <input
                      type="file"
                      id="brand_image"
                      name="brand_image"
                      accept="image/*"
                      hidden
                      onChange={(e) => setBrand_image(e.target.files[0])}
                    />
                  </label>
                </div>
              </form>
            </Modal>
          </section>

          <div className={wrapClass}>
            {brands?.map((brand) => (
              <Space
                key={brand._id}
                direction="vertical"
                size="middle"
                style={{
                  width: "100%",
                }}
              >
                <Badge.Ribbon
                  text={brand.deleted ? "Deleted Brand" : null}
                  color={brand.deleted ? "red" : "blue"}
                >
                  <div className="group">
                    <div
                      onClick={() => {
                        setCreateBrand(false);
                        setUpdateBrandName(false);
                        showUpdateBrandImageModal();
                        setBrandImagePreview(brand.image);
                        setBrandId(brand._id);
                      }}
                      className="relative overflow-hidden group-hover:opacity-75  hover:cursor-pointer"
                    >
                      <img
                        src={`/${brand.image.location}`}
                        alt={brand.brand_name}
                        className="sm:h-40 sm:min-w-[160px] sm:max-w-[160px] h-28 min-w-[7rem] max-w-[7rem] object-fill object-center rounded-full border-2 border-gray-700"
                      />
                    </div>
                    {/* Update brand image Modal */}
                    <Modal
                      open={isUpdateBrandImageModalOpen}
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
                          Change Brand Image
                        </h1>
                        <div className="space-y-2">
                          {!incomingImage && (
                            <div className="flex justify-center">
                              <img
                                src={`/${brandImagePreview?.location}`}
                                alt={brand.brand_name}
                                className="h-52 w-52 "
                              />
                            </div>
                          )}
                          {incomingImage && (
                            <div className="flex justify-center">
                              <img
                                src={URL.createObjectURL(incomingImage)}
                                alt={incomingImage?.name}
                                className="h-52 w-52 "
                              />
                            </div>
                          )}
                          <label
                            htmlFor="product_image1"
                            className="bg-blue-800 block text-white py-1 text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800"
                          >
                            {!incomingImage
                              ? brandImagePreview?.originalname
                              : incomingImage?.name}
                            <input
                              type="file"
                              id="product_image1"
                              name="product_image1"
                              accept="image/*"
                              hidden
                              onChange={(e) => {
                                setIncomingImage(e.target.files[0]);
                              }}
                            />
                          </label>
                        </div>
                      </form>
                    </Modal>
                    <h3 className="mt-3 text-sm text-gray-500 font-serif font-bold text-center">
                      {brand.brand_name}
                    </h3>
                  </div>
                  {!brand.deleted && (
                    <div className="flex justify-between space-x-1 mb-6 text-xs sm:text-base">
                      <button
                        onClick={() => {
                          showUpdateBrandNameModal();
                          setBrand_name(brand.brand_name);
                          setBrandId(brand._id);
                          setCreateBrand(false);
                          setUpdateBrandName(true);
                        }}
                        className="w-[50%] text-center mt-1 py-2  rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800"
                      >
                        Edit
                      </button>
                      {/* Update Brand Name Modal */}
                      <Modal
                        open={isUpdateBrandNameModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText={"Update Brand"}
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
                        <form onSubmit={handleOk}>
                          <h2 className="text-center font-serif font-bold mb-8">
                            Update Brand Name
                          </h2>
                          <label htmlFor="brandName">
                            <input
                              className="w-full rounded-lg"
                              id="brandName"
                              name="brand_name"
                              type="text"
                              value={brand_name}
                              onChange={(e) => setBrand_name(e.target.value)}
                            />
                          </label>
                        </form>
                      </Modal>

                      <div
                        onClick={() =>
                          showDeleteConfirm(brand.brand_name, brand._id)
                        }
                        className="mt-1 w-[50%] text-center py-2 rounded-lg bg-red-800 text-white hover:cursor-pointer hover:bg-red-900 active:bg-red-800"
                      >
                        Delete
                      </div>
                    </div>
                  )}
                  {brand.deleted && (
                    <div
                      onClick={() =>
                        showRestoreConfirm(brand.brand_name, brand._id)
                      }
                      className="mt-1 py-2 text-center w-[100%] rounded-lg bg-green-800 text-white hover:cursor-pointer hover:bg-green-900 active:bg-green-800"
                    >
                      Restore
                    </div>
                  )}
                </Badge.Ribbon>
              </Space>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBrandListing;
