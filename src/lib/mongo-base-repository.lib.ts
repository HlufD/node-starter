import {
  InsertManyOptions,
  Model,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export class MongoBaseRepository<T extends { _id: unknown }> {
  constructor(private readonly model: Model<T>) {}

  async create(data: Partial<T>) {
    return this.model.create(data);
  }

  async bulkCreate(data: Partial<T>[], options: InsertManyOptions) {
    return this.model.insertMany(data, options);
  }

  async findOne(
    filter: QueryFilter<T> = {},
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    const { lean, ...rest } = options ?? {};

    const query = this.model.findOne(filter, projection, rest);

    if (lean)
      if (typeof lean === "object") query.lean(lean);
      else query.lean();

    return query.exec();
  }

  async exists(filter: QueryFilter<T>): Promise<boolean> {
    const result = await this.model.exists(filter);
    return result != null;
  }

  async find(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    const { lean, ...rest } = options ?? {};

    const query = this.model.find(filter, projection, rest);

    if (lean)
      if (typeof lean === "object") query.lean(lean);
      else query.lean();

    return query.exec();
  }

  async updateOne(
    filter: QueryFilter<T>,
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model
      .findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
        ...options,
      })
      .exec();
  }

  async updateMany(
    filter: QueryFilter<T>,
    data: UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions,
  ) {
    return this.model.updateMany(filter, data, options).exec();
  }

  async paginate(filter?: QueryFilter<T>, options?: QueryOptions<T>) {
    return (this.model as any).paginate(filter, options);
  }
}
