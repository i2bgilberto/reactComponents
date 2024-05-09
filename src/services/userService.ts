import apiClient from '../services/api-service';

export interface User {
    id: number;
    name: string;
}

class  userService {
    
     getAllUsers() {
        const controller = new AbortController();
        const request =  apiClient.get<User[]>("/users", {
            signal: controller.signal,
        })

        return { request , cancel: () => controller.abort()}
    }

    deleteUser(id: number) {
        return  apiClient.delete(`/users/${id}`);
    }

    updateUser(user: User) {
        return  apiClient.put(`/users/${user.id}`, user);
    }

   addUser(user: User) {
        return  apiClient.post("/users", user);
    }
}

export default new userService();