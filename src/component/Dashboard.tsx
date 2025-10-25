import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import HeaderComponent from "./Header";
import { FaPlus } from "react-icons/fa6";
import TaskComponent from "./Task";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTaskFormSchema } from "../types/formSchema";
import { userAuthStore } from "../store/authStore";
import type { TaskDataProps } from "../types/taskDataTypes";

const DashboardComponent = () => {
  const { AddTask, userData, getMyTasks } = userAuthStore();
  const [myTasks, setMyTasks] = useState<TaskDataProps[]>([]);
  const userId = userData?.id as string;
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getMyTaskOnLoad = async () => {
      if (userId) {
        const allMyTasks = await getMyTasks(userId);
        setMyTasks(allMyTasks);
      }
    };
    getMyTaskOnLoad();
  }, [getMyTasks, userId]);

  console.log(myTasks);

  type AddTaskFormSchemaType = z.infer<typeof AddTaskFormSchema>;
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<AddTaskFormSchemaType>({
    resolver: zodResolver(AddTaskFormSchema),
  });
  const submit = async (formData: AddTaskFormSchemaType) => {
    try {
      setLoading(true);
      const { description, title } = formData;
      if (!userId) {
        return addToast({
          title: "Error",
          description: "Kindly login first",
          color: "danger",
          timeout: 5000,
        });
      }
      const response = await AddTask(title, description, userId);
      if (response) {
        const allMyTasks = await getMyTasks(userId);
        setMyTasks(allMyTasks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      setLoading(false);
      reset();
    }
  };
  return (
    <div className="w-full bg-maingreen">
      <div className="p-5 flex flex-col gap-10">
        <HeaderComponent />
        <div className="flex flex-row justify-between items-center">
          <div className="text-white">
            <h1 className="text-sm font-semibold">Total Task</h1>
            <p className="text-[0.8rem] font-semibold">{myTasks.length} task</p>
          </div>
          <Button
            size="md"
            onPress={() => setIsOpen(true)}
            className="bg-white text-maingreen"
          >
            Add Task <FaPlus className="text-maingreen" />
          </Button>
        </div>
      </div>

      {/* task component  */}
      <TaskComponent myTasks={myTasks} setMyTasks ={setMyTasks}/>

      {/* add task popup modal  */}
      <Modal isOpen={isOpen} size={"md"} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add New Task
          </ModalHeader>
          <ModalBody>
            <div className="p-5 bg-white/90 rounded-xl flex flex-col gap-4">
              <div>
                <h1 className="text-maingreen font-semibold text-xl">
                  Add New Task
                </h1>
                <p className="text-sm">Kindly enter the task details</p>
              </div>
              <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col gap-3"
              >
                <Input
                  {...register("title")}
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                  name="title"
                  label={"Title"}
                  placeholder="Title"
                  type="text"
                />
                <Textarea
                  {...register("description")}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  name="description"
                  label={"Description"}
                  placeholder="Title"
                  type="text"
                /> 
                {loading ? (
                  <Button
                    type="button"
                    className="bg-maingreen/75 text-white h-12 mt-10 font-semibold w-full cursor-not-allowed"
                    isDisabled
                    isLoading
                  >
                    Processing...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-maingreen  text-white h-12 mt-10 font-semibold w-full "
                  >
                    Submit
                  </Button>
                )}
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DashboardComponent;
