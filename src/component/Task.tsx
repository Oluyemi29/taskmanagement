import {
  addToast,
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { userAuthStore } from "../store/authStore";
import type { TaskDataProps } from "../types/taskDataTypes";
import moment from "moment";

type MyTaskProps = {
  myTasks: TaskDataProps[];
  setMyTasks: React.Dispatch<React.SetStateAction<TaskDataProps[]>>;
};
const TaskComponent = ({ myTasks, setMyTasks }: MyTaskProps) => {
  const { EditTask, userData, DeleteTask, getMyTasks, CompletedTask } =
    userAuthStore();
  const userId = userData?.id as string;

  const [editData, setEditData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [deleteData, setDeleteData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const nextTomorrow = new Date();
  nextTomorrow.setDate(today.getDate() + 2);
  const nextNextTomorrow = new Date();
  nextNextTomorrow.setDate(today.getDate() + 3);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      weekday: "short",
    });
  };

  // handleEditInputChange
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  //   submit edit data for action
  const SubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEditLoading(true);
      const { description, id, title } = editData;

      if (!description || !id || !title || !userId) {
        addToast({
          title: "Error",
          description: "All field are required",
          color: "danger",
          timeout: 5000,
        });
      }
      const response = await EditTask(title, description, userId, id);
      if (response) {
        const mytask = await getMyTasks(userId);
        setMyTasks(mytask);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditModalOpen(false);
      setEditLoading(false);
    }
  };

  //   submit delete data for action
  const SubmitDelete = async () => {
    try {
      setDeleteLoading(true);
      const { id } = deleteData;
      if (!id || !userId) {
        return addToast({
          title: "Error",
          description: "All field are required",
          color: "danger",
          timeout: 5000,
        });
      }
      const response = await DeleteTask(userId, id);
      if (response) {
        const mytask = await getMyTasks(userId);
        setMyTasks(mytask);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModalOpen(false);
      setDeleteLoading(false);
    }
  };

  const MarkCompletedTask = async (id: string) => {
    setCompleteLoading(true);
    try {
      const response = await CompletedTask(userId, id);
      if (response) {
        const mytask = await getMyTasks(userId);
        setMyTasks(mytask);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCompleteLoading(false);
    }
  };
  return (
    <div className="w-full rounded-tr-xl rounded-tl-xl bg-white p-5">
      {/* todays date to fourth day  */}
      <div className="flex flex-row gap-6 justify-center items-center">
        <div className="bg-maingreen rounded-lg text-center p-5">
          <h1 className="md:text-xl text-medium font-bold text-white">
            {formatDate(today)}
          </h1>
        </div>
        <div className="bg-maingreen/10 text-center rounded-lg p-5">
          <h1 className="md:text-xl text-medium font-bold text-maingreen">
            {formatDate(tomorrow)}
          </h1>
        </div>
        <div className="bg-maingreen/10 text-center rounded-lg p-5">
          <h1 className="md:text-xl text-medium font-bold text-maingreen">
            {formatDate(nextTomorrow)}
          </h1>
        </div>
        <div className="bg-maingreen/10 text-center rounded-lg p-5">
          <h1 className="md:text-xl text-medium font-bold text-maingreen">
            {formatDate(nextNextTomorrow)}
          </h1>
        </div>
      </div>

      <div className="w-full">
        <h1 className="md:text-xl md:text-center underline underline-offset-4 text-left text-lg font-semibold text-maingreen my-5">
          My Task
        </h1>
        {myTasks.length < 1 ? (
          <>
            <div className="w-full flex flex-col h-48 justify-center items-center">
              <h1 className="text-maingreen font-semibold">You have no Task</h1>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              {myTasks.map((eachTask, index) => {
                return (
                  <div
                    key={index}
                    className="bg-maingreen/10 rounded-lg p-3 flex flex-row md:gap-20 gap-7 justify-between"
                  >
                    <div className="flex flex-col">
                      <h1 className="text-sm font-semibold line-clamp-2">
                        {eachTask.title}
                      </h1>
                      <p className="text-[0.7rem] line-clamp-5 mt-3">
                        {eachTask.description}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="flex flex-row gap-3 justify-end items-start">
                        <Checkbox
                          color="success"
                          isSelected={eachTask.complete}
                          isReadOnly
                        />
                        <Popover placement="bottom-end">
                          <PopoverTrigger>
                            <BsThreeDotsVertical
                              className="cursor-pointer"
                              size={20}
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2 flex flex-col gap-2">
                              {completeLoading ? (
                                <Button
                                  size="sm"
                                  className="text-white bg-maingreen cursor-not-allowed"
                                  disabled
                                  isLoading
                                >
                                  Processing...
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  className="text-white bg-maingreen"
                                  onPress={() => MarkCompletedTask(eachTask.id)}
                                >
                                  Completed <IoMdCheckmark />
                                </Button>
                              )}
                              <Button
                                onPress={() => {
                                  setEditData((prevData) => {
                                    return {
                                      ...prevData,
                                      description: eachTask.description,
                                      id: eachTask.id,
                                      title: eachTask.title,
                                    };
                                  });
                                  setEditModalOpen(true);
                                }}
                                size="sm"
                                color="primary"
                              >
                                Edit <FaRegEdit />
                              </Button>
                              <Button
                                onPress={() => {
                                  setDeleteData((prevData) => {
                                    return {
                                      ...prevData,
                                      description: eachTask.description,
                                      id: eachTask.id,
                                      title: eachTask.title,
                                    };
                                  });
                                  setDeleteModalOpen(true);
                                }}
                                size="sm"
                                color="danger"
                              >
                                Delete
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <p className="text-[0.8rem]">
                        {moment(eachTask.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* edit form popup modal  */}
      <Modal
        isOpen={editModalOpen}
        size={"md"}
        onClose={() => setEditModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit This Task
          </ModalHeader>
          <ModalBody>
            <p>Kindly enter the details</p>
            <form
              onSubmit={(e: React.FormEvent) => SubmitEdit(e)}
              className="flex flex-col gap-3"
            >
              <Input
                label={"Title"}
                placeholder="Title"
                name="title"
                defaultValue={editData.title}
                value={editData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleEditInputChange(e)
                }
              />
              <Textarea
                label={"Description"}
                placeholder="Description"
                name="description"
                defaultValue={editData.description}
                value={editData.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleEditInputChange(e)
                }
              />
              {editLoading ? (
                <Button
                  type="button"
                  isDisabled
                  isLoading
                  className="cursor-not-allowed bg-maingreen/75 mt-16 text-white h-12"
                >
                  Processing...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-maingreen mt-16 text-white h-12"
                >
                  Submit
                </Button>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setEditModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* delete popup modal  */}
      <Modal
        isOpen={deleteModalOpen}
        size={"md"}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete This Task?
          </ModalHeader>
          <ModalBody className="flex flex-col gap-2">
            <p>Are you sure you want to delete this task?</p>
            <h1 className="text-sm font-semibold">{deleteData.title}</h1>
            <p className="text-sm">{deleteData.description}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setDeleteModalOpen(false)}
            >
              Close
            </Button>
            {deleteLoading ? (
              <Button
                className="bg-white border-2 border-red-700 text-red-700 cursor-not-allowed"
                disabled
                isLoading
              >
                Deleting...
              </Button>
            ) : (
              <Button
                className="bg-white border-2 border-red-700 text-red-700"
                onPress={() => SubmitDelete()}
              >
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TaskComponent;
