import { nanoid } from "nanoid";
import { NotFoundException } from "../../exceptions/not-found.exception";
import { CartItem, Order, OrderItem } from "../entities";
import sequelize from "../../database/db-sequelize.config";
import { Op } from "sequelize";

export class OrderRepository {
  constructor() {}

  /**
   * Receives a Order as parameter
   * @order
   * returns void
   */
  async create(order) {
    const { items, ...orderDetails } = order;
    const transaction = await sequelize.transaction();
    try {
      const newOrder = await Order.create({ ...orderDetails }, { transaction });
      const { id, userId } = newOrder.toJSON();
      const orderItems = items.map((item) => ({
        id: nanoid(20),
        orderId: id,
        crochetId: item.crochetId,
        qtty: item.qtty,
        price: parseFloat(item.amount),
        colors: item.colors,
      }));

      // 3. Bulk insert order items
      await OrderItem.bulkCreate(orderItems, { transaction });

      // 4. Clear user's cart (assuming cart is per user)
      await CartItem.destroy({ where: { userId }, transaction });

      // 5. Commit the transaction
      await transaction.commit();

      return newOrder;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Order
   */
  async findById(id) {
    try {
      const orderItem = await Order.findByPk(id, {
        include: [
          {
            model: OrderItem,
            as: "orderItems",
          },
        ],
      });

      if (!orderItem) {
        throw new NotFoundException("Order", id);
      }
      return orderItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @userId
   * returns Order
   */
  async findByUser(userId) {
    try {
      const userOrders = await Order.findAll({
        // where: { userId },
        where: {
          [Op.or]: [{ userId }, { telephone: userId }],
        },
        include: [
          {
            model: OrderItem,
            as: "orderItems",
          },
        ],
      });
      return userOrders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @title
   * returns Order
   */
  async findByTitle(title) {
    try {
      const orderItem = await Order.findOne({
        where: { title },
        include: [
          {
            model: OrderItem,
            as: "orderItems",
          },
        ],
      });
      return orderItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Order
   */
  async getAll() {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            as: "orderItems",
          },
        ],
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Order as parameter
   * @order
   * returns void
   */
  async update(orderInput) {
    const { id } = orderInput;
    try {
      const order = await Order.findByPk(id);

      if (!order) {
        throw new NotFoundException("Order", id.toString());
      }

      return await order?.update({ ...orderInput });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id) {
    try {
      const orderItem = await Order.findByPk(id);

      if (!orderItem) {
        throw new NotFoundException("Order", id);
      }

      await orderItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
