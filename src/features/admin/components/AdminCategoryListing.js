import React, { useState } from "react";
import { Button, Modal, Badge, Space } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAsync,
  deleteCategoryAsync,
  restoreCategoryAsync,
  updateCategoryImageAsync,
  updateCategoryNameAsync,
} from "../../products/productSlice";

const { confirm } = Modal;

const AdminCategoryListing = ({ wrapClass }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.product?.categories);

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [isUpdateCategoryNameModalOpen, setIsUpdateCategoryNameModalOpen] =
    useState(false);
  const [isUpdateCategoryImageModalOpen, setIsUpdateCategoryImageModalOpen] =
    useState(false);
  const [categoryImagePreview, setBrandImagePreview] = useState(null);
  const [incomingImage, setIncomingImage] = useState(null);
  const [category_image, setCategory_image] = useState(null);
  const [category_name, setCategory_name] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [createCategory, setCreateCategory] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState(false);

  const showDeleteConfirm = (categoryName, categoryId) => {
    confirm({
      title: `Are you sure to delete the '${categoryName}' category?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content:
        "Be Careful! All The Filters and all the related products etc., may not work expectedly. You can restore it anytime",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteCategoryAsync(categoryId));
      },
      onCancel() {},
    });
  };

  const showRestoreConfirm = (categoryName, categoryId) => {
    confirm({
      title: `Are you sure to Restore the '${categoryName}' category?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content: "You can delete it anytime you wanted.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(restoreCategoryAsync(categoryId));
      },
      onCancel() {},
    });
  };

  const showCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(true);
  };

  const showUpdateCategoryNameModal = () => {
    setIsUpdateCategoryNameModalOpen(true);
  };

  const showUpdateCategoryImageModal = () => {
    setIsUpdateCategoryImageModalOpen(true);
  };

  const handleOk = () => {
    if (createCategory && !updateCategoryName) {
      setIsCreateCategoryModalOpen(false);
      const formData = new FormData();
      formData.append("category_name", category_name);
      formData.append("image", category_image);
      dispatch(createCategoryAsync(formData));
    } else if (!createCategory && updateCategoryName) {
      setIsUpdateCategoryNameModalOpen(false);
      dispatch(updateCategoryNameAsync({ categoryId, category_name }));
    } else if (!createCategory && !updateCategoryName) {
      setIsUpdateCategoryImageModalOpen(false);
      const formData = new FormData();
      formData.append("image", incomingImage);
      dispatch(updateCategoryImageAsync({ categoryId, formData }));
    }
  };

  const handleCancel = () => {
    if (createCategory && !updateCategoryName) {
      setIsCreateCategoryModalOpen(false);
    } else if (!createCategory && updateCategoryName) {
      setIsUpdateCategoryNameModalOpen(false);
    } else if (!createCategory && !updateCategoryName) {
      setIsUpdateCategoryImageModalOpen(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-3 sm:py-2 lg:max-w-none lg:py-4">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            Categories
          </h2>
          {/* Create Category Modal */}
          <section>
            <Button
              className="bg-sky-800 text-white min-w-full font-bold font-serif tracking-widest"
              type="primary"
              onClick={() => {
                setCreateCategory(true);
                setUpdateCategoryName(false);
                showCreateCategoryModal();
              }}
            >
              Add New Category
            </Button>
            <Modal
              // title="Create A New Category"
              open={isCreateCategoryModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={"Create Category"}
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
                  Create A New Category
                </h1>
                <label htmlFor="category_name" className="flex flex-col">
                  <input
                    type="text"
                    id="category_name"
                    name="category_name"
                    className="rounded-lg min-h-full"
                    placeholder="Enter Category Name"
                    onChange={(e) => setCategory_name(e.target.value)}
                  />
                </label>

                <div className="space-y-2">
                  {category_image && (
                    <div className="flex justify-center">
                      <img
                        src={URL.createObjectURL(category_image)}
                        alt="category"
                        className="h-52 w-52 "
                      />
                    </div>
                  )}
                  <label
                    htmlFor="category_image"
                    className="bg-blue-800 block text-white py-1 text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800"
                  >
                    {category_image
                      ? category_image.name
                      : "Upload Image for category"}
                    <input
                      type="file"
                      id="category_image"
                      name="category_image"
                      accept="image/*"
                      hidden
                      onChange={(e) => setCategory_image(e.target.files[0])}
                    />
                  </label>
                </div>
              </form>
            </Modal>
          </section>

          <div className={wrapClass}>
            {categories?.map((category) => (
              <Space
                key={category._id}
                direction="vertical"
                size="middle"
                style={{
                  width: "100%",
                }}
              >
                <Badge.Ribbon
                  text={category.deleted ? "Deleted Category" : null}
                  color={category.deleted ? "red" : "blue"}
                >
                  <div className="group">
                    <div
                      onClick={() => {
                        setCreateCategory(false);
                        setUpdateCategoryName(false);
                        showUpdateCategoryImageModal();
                        setBrandImagePreview(category.image);
                        setCategoryId(category._id);
                      }}
                      className="relative overflow-hidden group-hover:opacity-75 hover:cursor-pointer"
                    >
                      <img
                        src={`/${category.image.location}`}
                        alt={category.category_name}
                        className="sm:h-40 sm:min-w-[160px] sm:max-w-[160px] h-28 min-w-[7rem] max-w-[7rem] object-fill object-center rounded-full border-2 border-gray-700"
                      />
                    </div>
                    {/* Update Category image Modal */}
                    <Modal
                      open={isUpdateCategoryImageModalOpen}
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
                          Change Category Image
                        </h1>
                        <div className="space-y-2">
                          {!incomingImage && (
                            <div className="flex justify-center">
                              <img
                                src={`/${categoryImagePreview?.location}`}
                                alt={category.category_name}
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
                              ? categoryImagePreview?.originalname
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
                      {category.category_name}
                    </h3>
                  </div>
                  {!category.deleted && (
                    <div className="flex justify-between space-x-1 mb-6 text-xs sm:text-base">
                      <div
                        onClick={() => {
                          showUpdateCategoryNameModal();
                          setCategory_name(category.category_name);
                          setCategoryId(category._id);
                          setCreateCategory(false);
                          setUpdateCategoryName(true);
                        }}
                        className="w-[50%] text-center mt-1 py-2  rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800"
                      >
                        Edit
                      </div>
                      {/* Update Category Name Modal */}
                      <Modal
                        open={isUpdateCategoryNameModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText={"Update Category"}
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
                            Update Category Name
                          </h2>
                          <label htmlFor="brandName">
                            <input
                              className="w-full rounded-lg"
                              id="brandName"
                              name="brand_name"
                              type="text"
                              value={category_name}
                              onChange={(e) => setCategory_name(e.target.value)}
                            />
                          </label>
                        </form>
                      </Modal>
                      <div
                        onClick={() =>
                          showDeleteConfirm(
                            category.category_name,
                            category._id
                          )
                        }
                        className="mt-1 w-[50%] text-center py-2 rounded-lg bg-red-800 text-white hover:cursor-pointer hover:bg-red-900 active:bg-red-800"
                      >
                        Delete
                      </div>
                    </div>
                  )}
                  {category.deleted && (
                    <div
                      onClick={() =>
                        showRestoreConfirm(category.category_name, category._id)
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

export default AdminCategoryListing;
