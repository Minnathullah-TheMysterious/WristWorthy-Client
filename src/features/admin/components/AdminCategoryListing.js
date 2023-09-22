import React, { useState } from "react";
import { Button, Modal, Badge, Space } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAsync,
  deleteCategoryAsync,
  restoreCategoryAsync,
} from "../../products/productSlice";

const { confirm } = Modal;

const AdminCategoryListing = ({ wrapClass }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.product?.categories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category_image, setCategory_image] = useState(null);
  const [category_name, setCategory_name] = useState("");

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
      onCancel() {
        console.log("Cancel");
      },
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
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log(category_name, category_image);
    const formData = new FormData();
    formData.append("category_name", category_name);
    formData.append("image", category_image);
    dispatch(createCategoryAsync(formData));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
              onClick={showModal}
            >
              Add New Category
            </Button>
            <Modal
              // title="Create A New Category"
              open={isModalOpen}
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
              <form preserve={false} className="space-y-5" onSubmit={handleOk}>
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
                  text={category.deleted ? "Deleted Category" : "Category"}
                  color={category.deleted ? "red" : "blue"}
                >
                  <div className="group">
                    <div className="relative overflow-hidden group-hover:opacity-75">
                      <img
                        src={`${process.env.REACT_APP_API}/${category.image.location}`}
                        alt={category.category_name}
                        className="sm:h-40 sm:min-w-[160px] sm:max-w-[160px] h-28 min-w-[7rem] max-w-[7rem] object-fill object-center rounded-full border-2 border-gray-700"
                      />
                    </div>
                    <h3 className="mt-3 text-sm text-gray-500 font-serif font-bold text-center">
                      {category.category_name}
                    </h3>
                  </div>
                  {!category.deleted && (
                    <div className="flex justify-between space-x-1 mb-6 text-xs sm:text-base">
                      <div className="w-[50%] text-center mt-1 py-2  rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800">
                        Edit
                      </div>
                      <div
                        onClick={() =>
                          showDeleteConfirm(category.category_name, category._id)
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
