import {
  Types,
  Schema,
  model,
  Document,
  QueryFilter,
  ProjectionType,
  UpdateQuery,
  QueryOptions,
  PaginateModel,
} from "mongoose";

import paginate from "mongoose-paginate-v2";

interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  username: string;
  avatar?: string;
}

type UserDocument = Document<IUser>;

type UserFilter = QueryFilter<IUser>;

type UserProjection = ProjectionType<IUser>;

type UserUpdate = UpdateQuery<IUser>;

type UserOptions = QueryOptions<IUser>;

const UserSchema = new Schema<IUser>(
  {
    _id: Schema.Types.ObjectId,
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true },
);

UserSchema.plugin(paginate);

const UserModel = model<IUser, PaginateModel<IUser>>("User", UserSchema);

export {
  IUser,
  UserModel,
  UserDocument,
  UserFilter,
  UserProjection,
  UserUpdate,
  UserOptions,
};
