import { MongoBaseRepository } from "../../lib/mongo-base-repository.lib.js";
import { UserModel } from "./user.models.js";

export const userRepository = new MongoBaseRepository(UserModel);
