import { addToast, Button, Image } from "@heroui/react";
import { FiLogOut } from "react-icons/fi";
import { userAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const HeaderComponent = () => {
  const { LogOut, userData } = userAuthStore();

  const userId = userData?.id;
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // extracting space if included in the name

  const userName = userData?.name.includes(" ")
    ? userData.name.split(" ")[0]
    : userData?.name;

  const handleLogout = async () => {
    setLoading(true);
    try {
      // checking is user Id exist
      if (!userId) {
        return addToast({
          title: "Error",
          description: "kindly login first",
          color: "danger",
          timeout: 5000,
        });
      }
      const response = await LogOut(userId);
      if (response) {
        addToast({
          title: "Done",
          description: "logout is done",
          color: "success",
          timeout: 5000,
        });
        return <Navigate to={"/login"}/>;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-col items-center justify-start">
        <div className="w-8 h-8 rounded-full">
          <Image
            src={
              userData?.image ||
              "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            }
            alt="user"
            width={"100%"}
            className="rounded-full border-2 border-white"
          />
        </div>
        <h1 className="text-white text-sm font-semibold md:block hidden">
          {userName}
        </h1>
      </div>
      <p className="text-white font-semibold">{new Date().toDateString()}</p>
      {loading ? (
        <Button
          disabled
          isLoading
          className="cursor-pointer"
          color="danger"
          size="md"
        >
          Processing...
        </Button>
      ) : (
        <Button onPress={() => handleLogout()} color="danger" size="md">
          Log out
          <FiLogOut />
        </Button>
      )}
    </div>
  );
};

export default HeaderComponent;
