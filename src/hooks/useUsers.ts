import { useEffect,useState } from "react";
import userService, {User} from "../services/user-service";
import { CanceledError, AxiosError} from "../services/api-client";


const useUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const { request, cancel } = userService.getAll<User>();

        setLoading
        
    
        request
          .then((res) => setUsers(res.data))
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError((err as AxiosError).message);
          })
          .finally(() => {
            setLoading(false);
          });
    
        return () => cancel();

      }, []);

      return { users,error , isLoading ,setUsers ,setError};

}


export default useUsers