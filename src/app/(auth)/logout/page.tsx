import { cookies } from "next/headers";
import DeleteUser from "@/components/DeleteUser";
import { redirect } from "next/navigation";

const Logout = async () => {
  async function deleteToken() {
    "use server";
    try {
      cookies().delete("token");
    } catch (error) {
    }
  }
  return <DeleteUser deleteToken={deleteToken} />;
};

export default Logout;
